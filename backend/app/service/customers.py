from pydantic import validator
from sqlalchemy.future import select
from backend.app.model import Customers, Person
from backend.app.config import db
from backend.app.service.schema import CustomerProfileResponse


class CustomerService:

    @staticmethod
    async def get_customer_profile(email: str):
        query = select(
            Customers.email,
            Person.first_name,
            Person.last_name,
            Customers.university_id,
            Person.phone_number,
        ).join_from(Customers, Person).where(Customers.email == email)

        result = await db.execute(query)
        customer_data = result.mappings().one()

        # Convert the result to a dictionary
        customer_dict = dict(customer_data)

        # Return an instance of CustomerProfileResponse
        return CustomerProfileResponse(**customer_dict)

