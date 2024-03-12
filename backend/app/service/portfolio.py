from sqlalchemy.orm import Session
from sqlalchemy.future import select
from backend.app.model import Portfolio, Photo
from backend.app.config import db
from backend.app.service.schema import PortfolioResponse, PhotoResponse

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
        portfolios = result.fetchall()  # Fetch all rows from the result

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
    
        # Return an instance of PortfolioResponse
        return PortfolioResponse(**portfolio_dict)
    
    @staticmethod
    async def update_portfolio(portfolio_id: str, new_data: PortfolioResponse):
        query = (
            select(Portfolio)
            .where(Portfolio.id == portfolio_id)
        )

        result = await db.execute(query)
        portfolio = result.scalars().one()

        # Update the customer data
        for key, value in new_data.items():
            setattr(portfolio, key, value)

        # Commit the changes
        await db.commit()
        
    @staticmethod
    async def get_photos(portfolio_id: str):
        query = (
            select(Photo.id,
                   Photo.image_url
                   )
            .where(Photo.portfolio_id == portfolio_id)
        )

        result = await db.execute(query)
        photos = result.scalars().all()

        # Convert the result to a dictionary
        photo_dict = dict(photos)

        # Return an instance of PhotoResponse
        return PhotoResponse(**photo_dict)