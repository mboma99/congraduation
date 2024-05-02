import pytest
from fastapi.testclient import TestClient
from backend.app.main import app


# Create a test client using the TestClient provided by FastAPI
client = TestClient(app)


def _test_checkout_endpoint():
    # Define a sample request payload
    payload = {
        "stripe_id": "price_1PAHHKAxTn6e6ofyNsic18gU",
        "quantity": 1  # Adjust quantity as needed
    }

    # Send a POST request to the checkout endpoint
    response = client.post("/stripe/checkout/", json=payload)
    print('TETETETETETETETETETETETETTETETETETETETTETETETTETETE')
    print (response.json())
    # Assert that the response status code is 200 (OK)
    assert response.status_code == 200

    # Assert that the response contains the expected keys
    assert "id" in response.json()
