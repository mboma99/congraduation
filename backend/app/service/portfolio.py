from uuid import uuid4
from sqlalchemy.orm import Session
import datetime, boto3,os
from sqlalchemy.future import select
from backend.app.model import Portfolio, Photo
from backend.app.config import db
from backend.app.service.schema import PortfolioResponse, PortfolioSchema,PortfolioUpdateResponse, PhotoResponse
from sqlalchemy import delete
from dotenv import load_dotenv

load_dotenv()
S3_BUCKET_NAME = os.getenv("S3_BUCKET_NAME")

class PortfolioService: 
 
    @staticmethod
    async def get_portfolios(photographer_id: str):
        query = (
            select(
                Portfolio.id,
                Portfolio.photographer_id,
                Portfolio.customer_first_name,
                Portfolio.customer_last_name,
                Portfolio.customer_email,
                Portfolio.graduation_year,
                Portfolio.is_active
            )
            .where(Portfolio.photographer_id == photographer_id)
        )

        result = await db.execute(query)
        portfolios = result.fetchall()

        # Convert each row to a dictionary
        portfolio_dicts = []
        for row in portfolios:
            portfolio_dict = {
                "id": row[0],
                "photographer_id": row[1],
                "customer_first_name": row[2],
                "customer_last_name": row[3],
                "customer_email": row[4],
                "graduation_year": row[5],
                "is_active": row[6]
            }
            portfolio_dicts.append(portfolio_dict)

        # Return a list of PortfolioResponse instances
        return [PortfolioResponse(**portfolio_dict) for portfolio_dict in portfolio_dicts]
        
    @staticmethod
    async def get_portfolio(portfolio_id: str):
        query = (
            select(Portfolio.id,
                    Portfolio.photographer_id,
                    Portfolio.customer_first_name,
                    Portfolio.customer_last_name,
                    Portfolio.customer_email,
                    Portfolio.graduation_year,
                    Portfolio.is_active
                   )
            .where(Portfolio.id == portfolio_id)
        )

        result = await db.execute(query)
        portfolio = result.mappings().one()
        # Convert the result to a dictionary
        portfolio_dict = dict(portfolio)
        
        # Fetch photos related to the portfolio
        photo_query = (
        select(
            Photo.id,
            Photo.image_url
        ).where(Photo.portfolio_id == portfolio_id))
        photo_result = await db.execute(photo_query)
        photos = photo_result.fetchall()

        # Convert the photo tuples to PhotoResponse instances
        photo_list = [PhotoResponse(id=row[0],image_url=row[1]) for row in photos]
        
        # Include photos in the portfolio dictionary
        portfolio_dict['photos'] = photo_list
    
        # Return an instance of PortfolioResponse
        return PortfolioResponse(**portfolio_dict)
    
    @staticmethod
    async def update_portfolio(portfolio_id: str, new_data: PortfolioUpdateResponse):
        query = (
            select(Portfolio)
            .where(Portfolio.id == portfolio_id)
        )
        result = await db.execute(query)
        portfolio = result.scalars().one()

        # Update the customer data
        for key, value in new_data.items():
            setattr(portfolio, key, value)
            
        # Update the edited_at field
        portfolio.edited_at = datetime.now()
        # Commit the changes
        await db.commit()
        
    @staticmethod 
    async def create_portfolio(new_portfolio_data: PortfolioSchema, photographer_id: str):
        _portfolio_id = str(uuid4())
        _created_at = datetime.datetime.now()
        _edited_at = datetime.datetime.now()
        _new_portfolio = Portfolio(
            id=_portfolio_id,
            photographer_id=photographer_id,
            customer_first_name=new_portfolio_data.customer_first_name,
            customer_last_name=new_portfolio_data.customer_last_name,
            customer_email=new_portfolio_data.customer_email,
            graduation_year=new_portfolio_data.graduation_year,
            is_active=new_portfolio_data.is_active,
            created_at=_created_at,
            edited_at=_edited_at
        )
        try:
            db.add(_new_portfolio)
            await db.commit()
            
            # Create S3 bucket folder
            s3_folder_key = f"{_portfolio_id}/"
            s3_client = boto3.client('s3')
            s3_client.put_object(Bucket=S3_BUCKET_NAME, Key=s3_folder_key)
            
            return _new_portfolio
        except Exception as e:
            # Rollback the database transaction in case of an error
            await db.rollback()
            raise e

    @staticmethod
    async def delete_portfolio(portfolio_id: str):
        try:
            s3 = boto3.resource('s3')
            bucket = s3.Bucket(S3_BUCKET_NAME)
            key_prefix = f"{portfolio_id}/"
            bucket.objects.filter(Prefix=key_prefix).delete()
            
        except Exception as e:
            raise e

        if db.in_transaction():
            # Use the existing transaction
            transaction = db.transaction()
        else:
            # Start a new transaction
            transaction = db.begin()

        try:
            await db.execute(delete(Photo).where(Photo.portfolio_id == portfolio_id))

            query = (
                delete(Portfolio)
                .where(Portfolio.id == portfolio_id)
                .returning(Portfolio)
            )
            result = await db.execute(query)
            deleted_portfolio = result.scalar()

            # Commit the transaction for the database operation
            await transaction.commit()

            return deleted_portfolio
        except Exception as e:
            # Rollback the transaction in case of an error
            await transaction.rollback()
            raise e  # Re-raise the exception to propagate it further

    
    @staticmethod
    async def delete_portfolio2(portfolio_id: str):
        async with db.begin() as transaction:
            try:
                # Delete photos associated with the portfolio
                await db.execute(delete(Photo).where(Photo.portfolio_id == portfolio_id))

                # Delete the portfolio itself
                query = (
                    delete(Portfolio)
                    .where(Portfolio.id == portfolio_id)
                    .returning(Portfolio)
                )
                result = await db.execute(query)
                deleted_portfolio = result.scalar()

                # Commit the transaction
                await transaction.commit()

                return deleted_portfolio
            except Exception as e:
                # Rollback the transaction in case of an error
                await transaction.rollback()
                raise e  # Re-raise the exception to propagate it further

    
        