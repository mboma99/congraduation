from fastapi import HTTPException
from fastapi.responses import JSONResponse
import stripe
import os
from fastapi import APIRouter, Request

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

router = APIRouter(
    prefix="/stripe",
    tags=['Stripe']
)

@router.post("/checkout/")
async def checkout(req: Request):
    try:
        data = await req.json()
        items = data.get('items')
        customer = data.get('customer')
        print(f"customer email:      {customer}")
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
        
        return JSONResponse(content={"id": checkout_session.id,"items": items}, status_code=200)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

@router.post("/webhook")
async def stripe_webhook(request: Request):
    payload = await request.body()
    sig_header = request.headers.get('Stripe-Signature')
    
    print("Received payload:", payload)
    print("Signature header:", sig_header)

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, os.getenv("STRIPE_ENDPOINT_SECRET")
        )
    except ValueError as e:
        # Invalid payload
        print("Error: Invalid payload")
        raise HTTPException(status_code=400, detail=str(e))
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        print("Error: Invalid signature")
        raise HTTPException(status_code=400, detail=str(e))

    # Handle the event
    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        # Extract data from the session object
        session_id = session['id']
        customer_email = session['customer_email']
        line_items = session['display_items']  # or session['line_items'] depending on your needs
        
        # Process the data as needed, such as storing it in your database
        print(f"Checkout Session ID: {session_id}")
        print(f"Customer Email: {customer_email}")
        print("Line Items:")
        for item in line_items:
            print(f"- {item['description']}: {item['amount']['total']} {item['currency']}")
        
        # You can also store this data in your database or perform any other actions
        
    return JSONResponse(content={"status": "success"}, status_code=200)

