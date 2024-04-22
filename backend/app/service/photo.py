from sqlalchemy.orm import Session
from uuid import uuid4
import datetime
from sqlalchemy.future import select
from backend.app.model import Photo, Portfolio
from backend.app.config import db
from backend.app.service.schema import PhotoSchema, PhotoResponse, PhotosResponse
from sqlalchemy import delete
import boto3 
import os
from dotenv import load_dotenv 
  
load_dotenv()

S3_BUCKET_NAME = os.getenv("S3_BUCKET_NAME")

class PhotoService:

    @staticmethod
    async def get_photos(portfolio_id: str):
        # Fetch photos related to the portfolio
        query = select(
            Photo.id,
            Photo.image_url
        ).where(Photo.portfolio_id == portfolio_id)
        result = await db.execute(query)
        photos = result.fetchall()

        # Convert the photo tuples to PhotoResponse instances
        photo_list = [PhotoResponse(id=row[0], image_url=row[1]) for row in photos]

        # Return an instance of PhotosResponse
        return PhotosResponse(photos=photo_list)

    @staticmethod
    async def get_photo(photo_id: str):
        query = (
            select(Photo.id,
                   Photo.portfolio_id,
                   Photo.image_url
                   )
            .where(Photo.id == photo_id)
        )

        result = await db.execute(query)
        photo = result.mappings().one()
        if photo is None:
            print(f"No photo found for photo_id: {photo_id}")
            return None

        print(f"Retrieved photo data: {photo}")
        photo_dict = dict(photo)

        # Return an instance of PhotoResponse
        return PhotoResponse(**photo_dict)
    
    @staticmethod
    async def create_photo(portfolio_id: str, image_url: str):
        try:
            
            query = (
            select(Portfolio.id
                   )
            .where(Portfolio.id == portfolio_id))
            result = await db.execute(query)
            portfolio = result.mappings().one()
            if portfolio is None:
                raise Exception("Portfolio not found.")
            
            
            _photo_id = str(uuid4())
            _new_photo_data = Photo (
                id=_photo_id,
                portfolio_id=portfolio_id,
                image_url=image_url
            )
            db.add(_new_photo_data)
            await db.commit()
            return _new_photo_data
        except Exception as e:
            await db.rollback()
            raise e

    
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
        try:
            query = (
                select(Photo)
                .where(Photo.id == photo_id)
            )
            result = await db.execute(query)
            photo = result.fetchone()
            if photo:
                await db.execute(delete(Photo).where(Photo.id == photo_id))
                await db.commit()
            else:
                raise Exception("Photo not found.")
            s3 = boto3.resource('s3')
            bucket = s3.Bucket(S3_BUCKET_NAME)
            key = f"{portfolio_id}/{photo_id}"
            bucket.delete_object(Delete={'Objects': [{'Key': key}]})
        except Exception as e:
            await db.rollback()
            raise e
        
    
    @staticmethod
    async def delete_photo2(photo_id: str):
        try:
            
            query = (
                select(Photo)
                .where(Photo.id == photo_id)
            )
            result = await db.execute(query)
            photo = result.fetchone()
            if photo:
                await db.execute(delete(Photo).where(Photo.id == photo_id))
                await db.commit()
            else:
                raise Exception("Photo not found.")
        except Exception as e:
            await db.rollback()
            raise e  
