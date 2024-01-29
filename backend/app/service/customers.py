from sqlalchemy.future import select
from backend.app.model import Customers, Person, Universities
from backend.app.config import db
from backend.app.service.schema import CustomerProfileResponse

class CustomerService:

    @staticmethod
    async def get_customer_profile(email: str):
        query = (
            select(
                Customers.email,
                Person.first_name,
                Person.last_name,
                Universities.university,
                Customers.university_id,
                Person.phone_number,
                Customers.address,
                Customers.postcode,
                Customers.city
            )
            .join_from(Customers, Person)
            .join_from(Customers, Universities, onclause=Customers.university_id == Universities.id)  # Join with Universities table
            .where(Customers.email == email)
        )

        result = await db.execute(query)
        customer_data = result.mappings().one()

        # Convert the result to a dictionary
        customer_dict = dict(customer_data)

        # Return an instance of CustomerProfileResponse
        return CustomerProfileResponse(**customer_dict)
