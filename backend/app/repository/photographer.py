from sqlalchemy import update as sql_update
from sqlalchemy.future import select

from app.config import db, commit_rollback
from app.model.photographer import Photographer
from app.repository.base_repo import BaseRepo


class PhotographerRepository(BaseRepo):
    model = Photographer

    @staticmethod
    async def find_by_email(email: str):
        query = select(Photographer).where(Photographer.email == email)
        return (await db.execute(query)).scalar_one_or_none()

    @staticmethod
    async def find_by_photographer_id(photographer_id: str):
        query = select(Photographer).where(Photographer.id == photographer_id)
        return (await db.execute(query)).scalar_one_or_none()
    
    @staticmethod
    async def update_password(email: str, password: str):
        query = sql_update(Photographer).where(Photographer.email == email).values(
            password=password).execution_options(synchronize_session="fetch")
        await db.execute(query)
        await commit_rollback()
        
    @staticmethod
    async def update_profile(email: str, new_data: dict):
        query = sql_update(Photographer).where(Photographer.email == email).values(
            **new_data).execution_options(synchronize_session="fetch")
        await db.execute(query)
        await commit_rollback()
