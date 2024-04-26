from sqlalchemy.orm import Session
from uuid import uuid4
import datetime
from fastapi import HTTPException, UploadFile
from sqlalchemy.future import select
from backend.app.model import Photo, Portfolio
from backend.app.config import db
from backend.app.service.schema import PhotoSchema, PhotoResponse, PhotosResponse
from backend.app.repository.photo import PhotoRepository
from backend.app.repository.portfolio import PortfolioRepository
from sqlalchemy import delete
from botocore.exceptions import ClientError
import boto3 
import os
from dotenv import load_dotenv 
  
load_dotenv()

S3_BUCKET_NAME = os.getenv("S3_BUCKET_NAME")

class PhotoService:
    
    @staticmethod
    async def get_photos(portfolio_id: str):
        _portfolio = await PortfolioRepository.find_by_portfolio_id(portfolio_id)
        if not _portfolio:
            raise Exception("Portfolio not found.")
        
        __photos = await PhotoRepository.find_by_portfolio_id(portfolio_id)
        photos = []

        for photo in __photos:
            photo_response = PhotoResponse(id=photo.id, image_url=photo.image_url)
            photos.append(photo_response)

        return PhotosResponse(photos=photos)
    
    @staticmethod
    async def get_photos_by_customer_email(email: str):
        _portfolio = await PortfolioRepository.find_by_customer_email(email)
        if not _portfolio:
            raise Exception("Portfolio not found.")
        _portfolio_id = _portfolio[0].id
        __photos = await PhotoRepository.find_by_portfolio_id(_portfolio_id)
        photos = []
        
        for photo in __photos:
            photo_response = PhotoResponse(id=photo.id, image_url=photo.image_url)
            photos.append(photo_response)
            
        return PhotosResponse(photos=photos)

    @staticmethod
    async def get_photo(photo_id: str):
        _photo = await PhotoRepository.get_by_id(photo_id)
        if not _photo:
            raise Exception("Photo not found.")
        return _photo
    
    @staticmethod
    async def create_photo(file: UploadFile, portfolio_id: str):
        _portfolio = await PortfolioRepository.find_by_portfolio_id(portfolio_id)
        if not _portfolio:
            raise Exception("Portfolio not found.")
        try:
            s3 = boto3.resource('s3')
            bucket = s3.Bucket(S3_BUCKET_NAME)
            key = f"{portfolio_id}/{file.filename}"
            bucket.upload_fileobj(file.file, key, ExtraArgs={'ACL': 'public-read'})
            _file_url = f"https://{S3_BUCKET_NAME}.s3.amazonaws.com/{key}"
        except Exception as e:
            return Exception("Portfolio not found.")(detail=f"Failed to upload photo: {str(e)}", status_code=500)
        _photo_id = str(uuid4())
        _new_photo_data = Photo (
                id=_photo_id,
                portfolio_id=portfolio_id,
                image_url=_file_url
            )
        await PhotoRepository.create(**_new_photo_data.dict())

    
    @staticmethod
    async def update_photo(photo_id: str, new_data: PhotoSchema):
        try:
            query = (
                select(Photo)
                .where(Photo.id == photo_id)
            )
            result = await db.execute(query)
            photo = await result.fetchone()

            if photo:
                for key, value in new_data.dict().items():
                    setattr(photo, key, value)

                await db.commit()
                return photo
            else:
                raise Exception("Photo not found.")
        except Exception as e:
            await db.rollback()
            raise e

    @staticmethod
    async def delete_photo(portfolio_id: str, photo_id: str):
        _photo = await PhotoRepository.get_by_id(photo_id)
        if not _photo:
            raise Exception("Photo not found.")
        
        _portfolio = await PortfolioRepository.get_by_id(portfolio_id)
        print ('WE GOT HERE porfolio made ')
        if not _portfolio:
            raise HTTPException(status_code=404, detail="Portfolio not found")
        print ('WE GOT HERE  porfolio not empty')
        # Check if portfolio is active
        try:
            # Delete photo from S3 bucket
            print ('WE GOT HERE ')
            s3 = boto3.resource('s3')
            bucket = s3.Bucket(S3_BUCKET_NAME)
            key = f"{portfolio_id}/{photo_id}"
            bucket.delete_objects(Delete={'Objects': [{'Key': key}]})
        except ClientError as e:
            if e.response['Error']['Code'] == 'NoSuchBucket':
                raise HTTPException(status_code=404, detail="Bucket not found")
            elif e.response['Error']['Code'] == 'AccessDenied':
                raise HTTPException(status_code=403, detail="Access denied to bucket")
            else:
                raise HTTPException(status_code=500, detail="Failed to delete portfolio in S3 bucket")
        await PhotoRepository.delete(photo_id)
