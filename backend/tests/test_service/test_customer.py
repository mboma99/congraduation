from fastapi import HTTPException
import pytest
from unittest.mock import AsyncMock, MagicMock
from app.config import db
from app.model.customer import Customers
from app.repository.person import PersonRepository
from app.repository.customer import CustomerRepository
from app.service.customers import CustomerService
from app.service.schema import PhotographerUpdateSchema


@pytest.fixture
def mock_customer():
    return MagicMock(
        id="1",
        person_id="2",
        email="customer@example.com",
        university="University of Example",
        university_id="3",
        address="123 Main St",
        postcode="nh6 6gh",
        user_type="customer"
    )
    

def mock_person():
    return MagicMock(
        id="2",
        first_name="John",
        last_name="Doe",
        phone_number="+771234567890"
    )
    
@pytest.mark.asyncio
async def test_get_customer(mock_customer, mock_person):
    CustomerRepository.find_by_email = AsyncMock(return_value=mock_customer)
    PersonRepository.get_by_id = AsyncMock(return_value=mock_person)
    
    result = await CustomerService.get_customer("customer@example.com")
    
    assert result.id == mock_customer.id
    assert result.email == mock_customer.email
    assert result.first_name == mock_person.first_name
    assert result.last_name == mock_person.last_name
    