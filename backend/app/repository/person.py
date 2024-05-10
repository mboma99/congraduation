from app.model.person import Person
from app.model.customer import Customers
from app.repository.base_repo import BaseRepo

from sqlalchemy import update as sql_update
from sqlalchemy.future import select

from app.config import db, commit_rollback

class PersonRepository(BaseRepo):
    model = Person
    
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
    
    @staticmethod
    async def update_profile(email: str, new_data: dict):
        query = sql_update(Person).where(Person.email == email).values(
            **new_data).execution_options(synchronize_session="fetch")
        await db.execute(query)
        await commit_rollback()