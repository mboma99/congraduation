from backend.app.repository.base_repo import BaseRepo
from backend.app.model.university import Universities
from sqlalchemy.future import select
from backend.app.config import db

class UniversityRepository(BaseRepo):
    model = Universities

    @staticmethod
    async def find_by_university_name(university: str):
        query = select(Universities).where(Universities.university == university)
        return (await db.execute(query)).scalars_one_or_none()

    @staticmethod
    async def get_university_id(university: str):
        query = select(Universities.id).where(Universities.university == university)
        result = await db.execute(query)
        university_id = result.scalar_one_or_none()
        return university_id
    
    @staticmethod 
    async def find_by_univeristy_id(university_id: str):
        query = select(Universities).where(Universities.id == university_id)
        university = (await db.execute(query)).scalars_one_or_none()
        return university