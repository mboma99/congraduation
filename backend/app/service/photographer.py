from sqlalchemy.orm import Session
from sqlalchemy.future import select
from backend.app.model import Photographer, Person,Portfolio
from backend.app.config import db
from backend.app.service.schema import PhotographerProfileResponse

class PhotographerService:
    
    @staticmethod
    async def get_photographer_profile(email: str):
        query = (
            select(
                Photographer.id,
                Person.id,
                Photographer.email,
                Person.first_name,
                Person.last_name,
                Person.phone_number
            )
            .join_from(Photographer, Person)
            .where(Photographer.email == email)
        )

        result = await db.execute(query)
        photographer_data = result.mappings().one()

        # Convert the result to a dictionary
        photographer_dict = dict(photographer_data)

        # Return an instance of CustomerProfileResponse
        return PhotographerProfileResponse(**photographer_dict)
    
    @staticmethod
    async def update_photographer_profile(email: str, new_data: PhotographerProfileResponse):
        query = (
            select(Photographer)
            .join_from(Photographer, Person)
            .where(Photographer.email == email)
        )

        result = await db.execute(query)
        photographer = result.scalars().one()

        # Update the customer data
        for key, value in new_data.items():
            setattr(photographer, key, value)

        # Commit the changes
        await db.commit()
    
    @staticmethod
    async def update_person_profile(email: str, new_data: dict):
        query = (
            select(Person)
            .join_from(Person, Photographer)
            .where(Photographer.email == email)
        )

        result = await db.execute(query)
        person = result.scalars().one()

        # Update the customer data
        for key, value in new_data.items():
            setattr(person, key, value)

        # Commit the changes
        await db.commit()