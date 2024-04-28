from sqlalchemy import update as sql_update
from sqlalchemy.future import select

from backend.app.config import db, commit_rollback
from backend.app.model.photo import Photo
from backend.app.repository.base_repo import BaseRepo

class PhotoRepository(BaseRepo):
    model = Photo

    @staticmethod
    async def find_by_photographer_id(photographer_id: str):
        query = select(Photo).where(Photo.photographer_id == photographer_id)
        return (await db.execute(query)).scalars_one_or_none()
    
    @staticmethod
    async def find_by_portfolio_id(portfolio_id: str):
        query = select(Photo).where(Photo.portfolio_id == portfolio_id)
        return (await db.execute(query)).scalars().all()

    @staticmethod
    async def find_by_photo_id(photo_id: str):
        query = select(Photo).where(Photo.id == photo_id)
        return (await db.execute(query)).scalars_one_or_none()

    @staticmethod
    async def update_photo(photo_id: str, new_data: dict):
        query = sql_update(Photo).where(Photo.id == photo_id).values(
            **new_data).execution_options(synchronize_session="fetch")
        await db.execute(query)
        await commit_rollback()
    
    @staticmethod
    async def delete_photos(photographer_id: str):
        query = Photo.__table__.delete().where(Photo.photographer_id == photographer_id)
        await db.execute(query)
        await commit_rollback()
