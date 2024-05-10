from uuid import uuid4
from sqlalchemy.orm import Session
import datetime, boto3,os
from sqlalchemy.future import select
from app.model import Portfolio, Photo
from app.config import db
from app.service.schema import PortfolioResponse, PortfolioRegisterSchema, PhotoResponse
from app.repository.portfolio import PortfolioRepository
from app.repository.photographer import PhotographerRepository
from app.repository.photo import PhotoRepository
from fastapi import HTTPException
from botocore.exceptions import ClientError
from dotenv import load_dotenv

load_dotenv()
S3_BUCKET_NAME = os.getenv("S3_BUCKET_NAME")

class PortfolioService: 
 
    @staticmethod
    async def get_portfolios(photographer_id: str):
        #check if user exists 
        _photographer = await PhotographerRepository.find_by_photographer_id(photographer_id)
        if not _photographer:
            raise HTTPException(status_code=404, detail="Photographer not found")
        else:
            _portfolios = await PortfolioRepository.find_by_photographer_id(photographer_id)
            if _portfolios:
                return _portfolios       
            else:
                raise HTTPException(status_code=404, detail="Portfolios not found")

    @staticmethod
    async def update_portfolio(portfolio_id: str, new_data: dict):
        _portfolio = await PortfolioRepository.find_by_portfolio_id(portfolio_id)
        if _portfolio:
            _edited_at = datetime.datetime.now()
            new_data["edited_at"] = _edited_at
            await PortfolioRepository.update(portfolio_id, **new_data)
        else:
            raise HTTPException(status_code=404, detail="Portfolio not found") 
    
    
    @staticmethod 
    async def create_portfolio(new_portfolio_data: PortfolioRegisterSchema, photographer_id: str):
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
                university_id=new_portfolio_data.university_id,
                is_active=new_portfolio_data.is_active,
                created_at=_created_at,
                edited_at=_edited_at
            )
            _email = await PhotographerRepository.find_by_email(_new_portfolio.customer_email)
            if _email:
                raise HTTPException(status_code=400, detail="Email already exists")
            #checking photographer exists
            _photographer = await PhotographerRepository.get_by_id(photographer_id)
            if not _photographer:
                raise HTTPException(status_code=404, detail="Photographer not found")
            else:
                #try to make a new portfolio in s3 bucket
                try:
                    s3_folder_key = f"{_portfolio_id}/"
                    s3_client = boto3.client('s3')
                    s3_client.put_object(Bucket=S3_BUCKET_NAME, Key=s3_folder_key)
                except Exception as e:
                    raise HTTPException(status_code=500, detail="Failed to create portfolio in S3 bucket")
                    
                #if s3 bucket is created, then try to make a new portfolio in database
                await PortfolioRepository.create(**_new_portfolio.dict())
                
        
    @staticmethod    
    async def delete_portfolio(portfolio_id: str):
        # Check if portfolio exists
        _portfolio = await PortfolioRepository.find_by_portfolio_id(portfolio_id)
        if not _portfolio:
            raise HTTPException(status_code=404, detail="Portfolio not found")
        #check if portfolio is active
        if _portfolio[0].is_active:
            raise HTTPException(status_code=400, detail="Portfolio is active cannot delete it")
        # Try to delete portfolio in S3 bucket
        try:
            s3 = boto3.resource('s3')
            bucket = s3.Bucket(S3_BUCKET_NAME)
            key = f"{portfolio_id}/"  # Ensure trailing slash for folder
            response = bucket.objects.filter(Prefix=key).delete()  # Delete all objects with prefix
        except ClientError as e:
            if e.response['Error']['Code'] == 'NoSuchBucket':
                raise HTTPException(status_code=404, detail="Bucket not found")
            elif e.response['Error']['Code'] == 'AccessDenied':
                raise HTTPException(status_code=403, detail="Access denied to bucket")
            else:
                raise HTTPException(status_code=500, detail="Failed to delete portfolio in S3 bucket")
        
        _photos = await PhotoRepository.find_by_portfolio_id(portfolio_id)
        if _photos:
            for photo in _photos:
                await PhotoRepository.delete(photo.id)
        # If S3 bucket deletion is successful, delete portfolio in database
        await PortfolioRepository.delete(portfolio_id)