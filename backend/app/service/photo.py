from sqlalchemy.orm import Session
from uuid import uuid4
import datetime
from sqlalchemy.future import select
from backend.app.model import Photo
from backend.app.config import db
from backend.app.service.schema import PhotoSchema, PhotoResponse, PhotosResponse

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
        _photo_id = str(uuid4())
        _new_photo_data = Photo (
            id=_photo_id,
            portfolio_id=portfolio_id,
            image_url=image_url
            
        )
        db.add(_new_photo_data)
        await db.commit()
        return _new_photo_data
    
    @staticmethod
    async def update_photo(photo_id: str, new_data: PhotoSchema):
        query = (
            select(Photo)
            .where(Photo.id == photo_id)
        )
        result = await db.execute(query)
        photo = result.scalars().one()

        # Update the photo data
        for key, value in new_data.dict().items():
            setattr(photo, key, value)

        # Commit the changes
        await db.commit()
        return photo
    
    @staticmethod
    async def delete_photo(photo_id: str):
        query = (
            select(Photo)
            .where(Photo.id == photo_id)
        )
        result = await db.execute(query)
        photo = result.scalars().one()
        db.delete(photo)
        await db.commit()
        return photo