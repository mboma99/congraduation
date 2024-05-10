
from sqlalchemy.future import select
from app.model import Customers, Person
from app.config import db
from app.service.schema import CustomerProfileResponse

class PersonService:

    @staticmethod
    async def update_person_profile(email: str, new_data: dict):
        query = (
            select(Person)
            .join_from(Person, Customers)
            .where(Customers.email == email)
        )

        result = await db.execute(query)
        person = result.scalars().one()

        # Update the customer data
        for key, value in new_data.items():
            setattr(person, key, value)

        # Commit the changes
        await db.commit()