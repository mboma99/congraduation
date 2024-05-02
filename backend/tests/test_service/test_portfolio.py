
import pytest
from unittest.mock import MagicMock, AsyncMock
from backend.app.service.portfolio import PortfolioService
from backend.app.repository.portfolio import PortfolioRepository
from backend.app.repository.photographer import PhotographerRepository
from backend.app.service.schema import PortfolioRegisterSchema
from fastapi import HTTPException
from botocore.exceptions import ClientError
from sqlalchemy.future import select
from backend.app.model import Portfolio, Photo
import datetime
import os
import boto3
from uuid import uuid4

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
        is_active=False
    )

@pytest.fixture
def mock_file():
    return MagicMock(filename="test_photo.jpg", file=MagicMock())

@pytest.fixture
def mock_photographer():
    return MagicMock(id="photographer_id", email="photographer@example.com")

@pytest.fixture
def mock_portfolio_schema():
    return PortfolioRegisterSchema(
        customer_first_name="John",
        customer_last_name="Doe",
        customer_email="john@example.com",
        graduation_year=2024,
        university_id="university_id",
        is_active=True
    )

@pytest.mark.asyncio
async def test_get_portfolios_existing_photographer(mock_portfolio, mock_photographer):
    # Mock the database interaction
    PhotographerRepository.find_by_photographer_id = AsyncMock(return_value=mock_photographer)
    PortfolioRepository.find_by_photographer_id = AsyncMock(return_value=[mock_portfolio])

    # Call the service method
    result = await PortfolioService.get_portfolios("photographer_id")

    # Check the result
    assert len(result) == 1
    assert result[0].id == mock_portfolio.id

@pytest.mark.asyncio
async def test_get_portfolios_non_existing_photographer(mock_photographer):
    # Mock the database interaction
    PhotographerRepository.find_by_photographer_id = AsyncMock(return_value=None)

    # Call the service method and expect an exception
    with pytest.raises(HTTPException) as exc_info:
        await PortfolioService.get_portfolios("non_existent_photographer_id")

    # Check if HTTPException with status_code 404 is raised
    assert exc_info.value.status_code == 404

@pytest.mark.asyncio
async def test_update_portfolio_existing_portfolio(mock_portfolio):
    # Mock the database interaction
    PortfolioRepository.find_by_portfolio_id = AsyncMock(return_value=mock_portfolio)
    PortfolioRepository.update = AsyncMock()

    # Define new data
    new_data = {"customer_first_name": "Updated Name"}

    # Call the service method
    await PortfolioService.update_portfolio("portfolio_id", new_data)

    # Check if PortfolioRepository.update was called with the correct arguments
    PortfolioRepository.update.assert_called_once_with("portfolio_id", **new_data)

@pytest.mark.asyncio
async def test_update_portfolio_non_existing_portfolio():
    # Mock the database interaction
    PortfolioRepository.find_by_portfolio_id = AsyncMock(return_value=None)

    # Call the service method and expect an exception
    with pytest.raises(HTTPException) as exc_info:
        await PortfolioService.update_portfolio("non_existent_portfolio_id", {})

    # Check if HTTPException with status_code 404 is raised
    assert exc_info.value.status_code == 404

@pytest.mark.asyncio
async def test_create_portfolio_existing_email(mock_portfolio_schema, mock_photographer):
    # Mock the database interaction
    PhotographerRepository.find_by_email = AsyncMock(return_value=mock_photographer)

    # Call the service method and expect an exception
    with pytest.raises(HTTPException) as exc_info:
        await PortfolioService.create_portfolio(mock_portfolio_schema, "photographer_id")

    # Check if HTTPException with status_code 400 is raised
    assert exc_info.value.status_code == 400

@pytest.mark.asyncio
async def test_create_portfolio_non_existing_photographer(mock_portfolio_schema):
    # Mock the database interaction
    PhotographerRepository.find_by_email = AsyncMock(return_value=None)

    # Call the service method and expect an exception
    with pytest.raises(HTTPException) as exc_info:
        await PortfolioService.create_portfolio(mock_portfolio_schema, "non_existent_photographer_id")

    # Check if HTTPException with status_code 404 is raised
    assert exc_info.value.status_code == 404

@pytest.mark.asyncio
async def test_create_portfolio_failed_to_create_in_s3(monkeypatch, mock_portfolio_schema, mock_photographer):
    # Mock the database interaction
    PhotographerRepository.find_by_email = AsyncMock(return_value=mock_photographer)

    # Define a function to raise an exception
    async def raise_exception(*args, **kwargs):
        raise ClientError({"Error": {"Code": "SomeErrorCode"}}, "operation_name")

    # Mock S3 bucket creation to raise an exception
    monkeypatch.setattr(boto3.client('s3'), "put_object", raise_exception)

    # Call the service method and expect an exception
    with pytest.raises(HTTPException) as exc_info:
        await PortfolioService.create_portfolio(mock_portfolio_schema, "photographer_id")

    assert exc_info.value.status_code == 400

@pytest.mark.asyncio
async def test_delete_portfolio_existing_portfolio():
    # Mock the database interaction
    PortfolioRepository.find_by_portfolio_id = AsyncMock(return_value=[MagicMock(is_active=False)])

    # Call the service method
    await PortfolioService.delete_portfolio("portfolio_id")

    # Check if PortfolioRepository.delete was called with the correct argument
    PortfolioRepository.delete.assert_awaited_once_with("portfolio_id", "name")


@pytest.mark.asyncio
async def test_delete_portfolio_non_existing_portfolio():
    # Mock the database interaction
    PortfolioRepository.find_by_portfolio_id = AsyncMock(return_value=None)

    # Call the service method and expect an exception
    with pytest.raises(HTTPException) as exc_info:
        await PortfolioService.delete_portfolio("non_existent_portfolio_id")

    # Check if HTTPException with status_code 404 is raised
    assert exc_info.value.status_code == 404




