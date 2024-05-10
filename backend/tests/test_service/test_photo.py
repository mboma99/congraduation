from fastapi import HTTPException
import pytest
from unittest.mock import MagicMock, AsyncMock
from app.model.photo import Photo
from app.repository.photo import PhotoRepository
from app.repository.portfolio import PortfolioRepository
from app.repository.photo import PhotoRepository
from app.repository.product_type import ProductTypeRepository
from botocore.exceptions import BotoCoreError
from app.service.photo import PhotoService
from app.service.schema import PhotoResponse
from moto import mock_aws

@pytest.fixture
def mock_portfolio():
    return MagicMock(
        id="portfolio_id",
        photographer_id="photographer_id",
        customer_first_name="John",
        customer_last_name="Doe",
        customer_email="john@example.com",
        graduation_year=2024,
        university_id="university_id",
        is_active=True
    )

@pytest.fixture
def mock_photo():
    return MagicMock(
        id="photo_id",
        portfolio_id="portfolio_id",
        image_url="https://example.com/photo.jpg",
        product_type_id="product_type_id"
    )

@pytest.fixture
def mock_product_type():
    return MagicMock(
        price=10.0,
        stripe_id="stripe_id"
    )

@pytest.fixture
def mock_file():
    return MagicMock(filename="test_photo.jpg", file=MagicMock())

@pytest.mark.asyncio
async def test_get_photos_existing_portfolio(mock_portfolio, mock_photo, mock_product_type):
    PortfolioRepository.get_by_id = AsyncMock(return_value=mock_portfolio)
    PhotoRepository.find_by_portfolio_id = AsyncMock(return_value=[mock_photo])
    ProductTypeRepository.get_by_id = AsyncMock(return_value=mock_product_type)

    result = await PhotoService.get_photos("portfolio_id")

    assert result['id'] == mock_portfolio.id
    assert result['photos'][0].id == mock_photo.id
    assert result['photos'][0].price == mock_product_type.price  
    assert result['photos'][0].stripe_id == mock_product_type.stripe_id 

@pytest.mark.asyncio
async def test_get_photos_missing_portfolio():
    PortfolioRepository.get_by_id = AsyncMock(return_value=None)

    with pytest.raises(HTTPException) as exc_info:
        await PhotoService.get_photos("non_existent_portfolio_id")

    assert exc_info.value.status_code == 404

@pytest.mark.asyncio
async def test_get_photo_existing_photo(mock_photo, mock_product_type):
    PhotoRepository.get_by_id = AsyncMock(return_value=mock_photo)
    ProductTypeRepository.get_by_id = AsyncMock(return_value=mock_product_type)

    result = await PhotoService.get_photo("photo_id")

    assert result.id== mock_photo.id
    assert result.portfolio_id == mock_photo.portfolio_id
    assert str(result.image_url) == mock_photo.image_url
    assert result.price == mock_product_type.price

@pytest.mark.asyncio
async def test_get_photo_missing_photo():
    PhotoRepository.get_by_id = AsyncMock(return_value=None)

    with pytest.raises(HTTPException) as exc_info:
        await PhotoService.get_photo("non_existent_photo_id")

    assert exc_info.value.status_code == 404
    
@pytest.mark.asyncio
async def test_get_photos_by_customer_email_existing_portfolio(mock_portfolio, mock_photo, mock_product_type):
    PortfolioRepository.find_by_customer_email = AsyncMock(return_value=[mock_portfolio])
    PhotoRepository.find_by_portfolio_id = AsyncMock(return_value=[mock_photo])
    ProductTypeRepository.get_by_id = AsyncMock(return_value=mock_product_type)

    result = await PhotoService.get_photos_by_customer_email("john@example.com")
    
    assert result['id'] == mock_portfolio.id
    assert result['photos'][0].id == mock_photo.id
    assert result['photos'][0].price == mock_product_type.price
    assert result['photos'][0].stripe_id == mock_product_type.stripe_id

@pytest.mark.asyncio
async def test_create_photo_portfolio_not_found(mock_portfolio, mock_file):
    PortfolioRepository.find_by_portfolio_id = AsyncMock(return_value=None)

    with pytest.raises(Exception) as exc_info:
        await PhotoService.create_photo(mock_file, "portfolio_id")

    assert str(exc_info.value) == "Portfolio not found."

@pytest.mark.asyncio
async def test_create_photo_upload_failure(mock_file, monkeypatch):
    PortfolioRepository.find_by_portfolio_id = AsyncMock(return_value=None)

    async def raise_boto_error(*args, **kwargs):
        raise BotoCoreError("Upload failed")

    monkeypatch.setattr(
        'backend.app.service.photo.boto3.resource',
        AsyncMock(side_effect=raise_boto_error)
    )

    with pytest.raises(HTTPException) as exc_info:
        await PhotoService.create_photo(mock_file, "portfolio_id")

    assert str(exc_info.value) == "Failed to upload photo: Upload failed"

    PortfolioRepository.find_by_portfolio_id.assert_called_once_with("portfolio_id")
    assert not PhotoRepository.create.called

@pytest.mark.asyncio
async def _test_create_photo_success(mock_portfolio, mock_file, monkeypatch):
    PortfolioRepository.find_by_portfolio_id = AsyncMock(return_value=mock_portfolio)

    monkeypatch.setattr(
        'backend.app.service.photo.boto3.resource',
        MagicMock().Bucket().upload_fileobj
    )

    result = await PhotoService.create_photo(mock_file, "portfolio_id")

    assert isinstance(result, Photo)
    assert result.portfolio_id == "portfolio_id"
    assert result.image_url.startswith("https://")
    assert result.product_type_id == "1"
