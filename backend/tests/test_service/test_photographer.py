from fastapi import HTTPException
import pytest
from unittest.mock import AsyncMock, MagicMock
from backend.app.config import db
from backend.app.model.photographer import Photographer
from backend.app.repository.person import PersonRepository
from backend.app.repository.photographer import PhotographerRepository
from backend.app.service.photographer import PhotographerService
from backend.app.service.schema import PhotographerUpdateSchema

@pytest.fixture
def mock_photographer():
    return MagicMock(
        id="1",
        person_id="2",
        email="photographer@example.com",
        user_type="photographer"
    )
    
@pytest.fixture
def mock_person():
    return MagicMock(
        id="2",
        first_name="John",
        last_name="Doe",
        phone_number="+771234567890"
    )


@pytest.mark.asyncio
async def test_get_photographer(mock_photographer, mock_person):
    PhotographerRepository.find_by_email = AsyncMock(return_value=mock_photographer)
    PersonRepository.get_by_id = AsyncMock(return_value=mock_person)
    
    result = await PhotographerService.get_photographer("photographer@example.com")

    assert result.id == mock_photographer.id
    assert result.email == mock_photographer.email
    assert result.first_name == mock_person.first_name
    assert result.last_name == mock_person.last_name
    assert result.phone_number == mock_person.phone_number
    assert result.user_type == mock_photographer.user_type

@pytest.mark.asyncio
async def test_get_photographer_missing_photographer():
    PhotographerRepository.find_by_email = AsyncMock(return_value=None)
    with pytest.raises(HTTPException):
        await PhotographerService.get_photographer("photographer@example.com")
        
@pytest.mark.asyncio
async def test_update_photographer_profile(mock_photographer):
    PhotographerRepository.find_by_email = AsyncMock(return_value=mock_photographer)
    new_data = PhotographerUpdateSchema(email="john@example.com")
    result = await PhotographerService.update_photographer_profile("1", new_data)
    
    
@pytest.mark.asyncio
async def test_update_photographer_person_profile(mock_photographer, mock_person):
    PhotographerRepository.find_by_email = AsyncMock(return_value=mock_photographer)
    PersonRepository.get_by_id = AsyncMock(return_value=mock_person)
    PhotographerRepository.update = AsyncMock()
    PersonRepository.update = AsyncMock()

    new_data = {
        "first_name": "Jane",
        "last_name": "Doe",
        "phone_number": "+771234567891"
    }
    result = await PhotographerService.update_person_profile("1", new_data)