import pytest
from unittest.mock import AsyncMock, MagicMock
from fastapi import HTTPException
from botocore.exceptions import ClientError
from backend.app.service.photo import PhotoService

# Mock dependencies
from backend.app.repository.photo import PhotoRepository
from backend.app.repository.portfolio import PortfolioRepository
from backend.app.repository.product_type import ProductTypeRepository

@pytest.fixture
def photo_service():
    return PhotoService()

@pytest.mark.asyncio
async def test_get_photos():
    portfolio_id = "portfolio_id"
    mock_portfolio = MagicMock()
    mock_portfolio.id = portfolio_id
    mock_portfolio.photographer_id = "photographer_id"
    mock_portfolio.customer_first_name = "John"
    mock_portfolio.customer_last_name = "Doe"
    mock_portfolio.customer_email = "john@example.com"
    mock_portfolio.graduation_year = 2024
    mock_portfolio.university_id = "university_id"
    mock_portfolio.is_active = True

    mock_photos = [
        {"id": "photo_id_1", "image_url": "photo_url_1", "price": 10, "stripe_id": "stripe_id_1"},
        {"id": "photo_id_2", "image_url": "photo_url_2", "price": 20, "stripe_id": "stripe_id_2"}
    ]

    PortfolioRepository.get_by_id = AsyncMock(return_value=mock_portfolio)
    PhotoRepository.find_by_portfolio_id = AsyncMock(return_value=mock_photos)
    ProductTypeRepository.get_by_id = AsyncMock(return_value={"price": 30, "stripe_id": "stripe_id_3"})

    service = PhotoService()
    result = await service.get_photos(portfolio_id)

    assert result['id'] == portfolio_id
    assert len(result['photos']) == 2

@pytest.mark.asyncio
async def test_get_photos_by_customer_email():
    # Similar setup as above, but mock the repository method `find_by_customer_email`
    pass  # Implement this test similarly to test_get_photos()

# Write similar tests for other methods in PhotoService class
# Mock dependencies appropriately for each test

# Example test for create_photo
@pytest.mark.asyncio
async def test_create_photo():
    portfolio_id = "portfolio_id"
    mock_portfolio = MagicMock()
    mock_portfolio.id = portfolio_id

    upload_file_mock = MagicMock()
    upload_file_mock.filename = "test.jpg"
    upload_file_mock.file = MagicMock()

    PortfolioRepository.find_by_portfolio_id = AsyncMock(return_value=mock_portfolio)

    service = PhotoService()
    with pytest.raises(Exception):
        await service.create_photo(upload_file_mock, portfolio_id)

# Write similar tests for other methods in PhotoService class
# Mock dependencies appropriately for each test
