from typing import List
from fastapi import HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.future import select
from backend.app.model import Customers, Person, Universities
from backend.app.config import db
from backend.app.service.schema import CustomerProfileResponse, PersonProfileUpdate
from backend.app.repository.customer import CustomerRepository
from backend.app.repository.person import PersonRepository

class CustomerService:

    @staticmethod
    async def get_customer_profile(email: str):
        query = (
            select(
                Customers.id,
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
        customer_dict['user_type'] = 'customer'

        # Return an instance of CustomerProfileResponse
        return CustomerProfileResponse(**customer_dict)
    
    @staticmethod
    async def get_customer_id(id: str):
        _customer  = await CustomerRepository.get_by_id(id)
        if not _customer:
            raise HTTPException(status_code=404, detail="Customer not found")
        else:
            return _customer
        
    @staticmethod
    async def update_customer_id(id: str, new_data: dict):
        _customer = await CustomerRepository.get_by_id(id)
        if _customer:
            await CustomerRepository.update(id, **new_data)
        else:
            raise HTTPException(status_code=404, detail="Customer not found")
        
    @staticmethod
    async def update_profile_id(id: str, new_data: dict):
        _customer = await CustomerRepository.get_by_id(id)
        if _customer:
            _person_id = _customer.person_id
            _person = await PersonRepository.get_by_id(_person_id)
            if _person:
                await PersonRepository.update(_person_id, **new_data)
        else:
            raise HTTPException(status_code=404, detail="Customer not found")
    
    @staticmethod
    async def get_all_customer_profile(email: str):
        query = (
            select(
                Customers.id,
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
            .join_from(Customers, Universities, onclause=Customers.university_id == Universities.id)
        )

        result = await db.execute(query)
        customer_data = result.mappings().all()
        
        customer_profiles = []
        for data in customer_data:
            customer_dict = dict(data)
            customer_dict['user_type'] = 'customer'
            customer_profile = CustomerProfileResponse(**customer_dict)
            customer_profiles.append(customer_profile)
        
        return customer_profiles
        
    
    @staticmethod
    async def update_customer_profile(email: str, new_data: dict):
        query = (
            select(Customers)
            .join_from(Customers, Person)
            .where(Customers.email == email)
        )

        result = await db.execute(query)
        customer = result.scalars().one()

        # Update the customer data
        for key, value in new_data.items():
            setattr(customer, key, value)

        # Commit the changes
        await db.commit()

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
        