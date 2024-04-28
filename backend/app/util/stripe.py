#Portrait Photos: price_1PAHHKAxTn6e6ofyNsic18gU
from fastapi.responses import JSONResponse
import stripe
import os
from fastapi import APIRouter, Request
from fastapi import HTTPException
from backend.app.service.schema import ResponseSchema, RegisterSchema, LoginSchema, ForgotPasswordSchema, RefreshTokenSchema, RegisterPhotographerSchema
from backend.app.service.auth_service import AuthService

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")


router = APIRouter(
    prefix="/stripe",
    tags=['Stripe']
)

@router.post("/checkout2/")
async def checkout(req: Request):
    data = await req.json()
    print('BIG DATAAAAAAAAAAAAAAAAAAAAAA')
    print(data)
    
    checkout_session = stripe.checkout.Session.create(
        payment_method_types=['card'],
        line_items=[
            {
                'price': data['stripe_id'],
                'quantity': data['quantity'],
            },
        ],
        mode='payment',
        success_url='http://localhost:8000/success',
        cancel_url='http://localhost:8000/cancel',
    )
    return JSONResponse(content={"id": checkout_session.id})

from typing import List

@router.post("/checkout/")
async def checkout(req: Request):
    try:
        data = await req.json()
        items = data.get('items')
        if not items:
            return JSONResponse(content={"error": "No items provided"}, status_code=400)

        line_items = [
            {
                'price': item.get('stripe_id'),
                'quantity': item.get('quantity', 1),  # Default to 1 if quantity is not provided
            }
            for item in items
        ]

        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=line_items,
            mode='payment',
            success_url='http://localhost:3000/success',
            cancel_url='http://localhost:3000/cancel',
        )
        return JSONResponse(content={"id": checkout_session.id})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)





@router.post("/process-payment/")
async def process_payment(amount: int, currency: str, token: str):
    try:
        charge = stripe.Charge.create(
            amount=amount,
            currency=currency,
            source=token,  # Stripe token obtained from the client-side (e.g., Stripe.js)
            description="Payment for FastAPI Store",  # Add a description for the payment
        )
        return {"status": "success", "charge_id": charge.id}

    except stripe.error.CardError as e:
        # Handle specific Stripe errors
        return {"status": "error", "message": str(e)}
    except stripe.error.StripeError as e:
        # Handle generic Stripe errors
        return {"status": "error", "message": "Something went wrong. Please try again later."}
