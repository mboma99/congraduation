import uvicorn
from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from app.config import db
import os


origins= [
    os.getenv("FRONTEND_URL")
]

def init_app():
    db.init()

    temp_app = FastAPI(
        title="Congraduation",
        description="Login Page",
        version="1"
    )
    temp_app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"]
    )

    router = APIRouter()
    @temp_app.on_event("startup")
    async def startup():
        await db.create_all()

    @temp_app.on_event("shutdown")
    async def shutdown():
        await db.close()

    from app.controller import authentication, customers, photographer, portfolio, photo
    from app.util import stripe
    temp_app.include_router(authentication.router)
    temp_app.include_router(customers.router)
    temp_app.include_router(photographer.router)
    temp_app.include_router(portfolio.router)
    temp_app.include_router(photo.router)
    temp_app.include_router(stripe.router)
    return temp_app

app = init_app()

if __name__ == "__main__":
    pass