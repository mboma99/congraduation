from backend.app.repository.base_repo import BaseRepo
from backend.app.model.graduation import Graduations
from sqlalchemy.future import select
from backend.app.config import db


class GraduationRepository(BaseRepo):
    model = Graduations

    @staticmethod
    async def find_by_university_name(university: str):
        query = select(Graduations).where(Graduations.university == university)
        return (await db.execute(query)).scalars_one_or_none()

    @staticmethod
    async def get_graduation_id(university: str):
        query = select(Graduations.id).where(Graduations.university == university)
        result = await db.execute(query)
        graduation = result.scalar_one_or_none()
        print(f"this is graduation->{graduation}")
        return graduation