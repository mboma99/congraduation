import uvicorn
from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from backend.app.config import db


origins= [
    "http://localhost:3000"
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

    from backend.app.controller import authentication, customers, photographer, portfolio, photo
    temp_app.include_router(authentication.router)
    temp_app.include_router(customers.router)
    temp_app.include_router(photographer.router)
    temp_app.include_router(portfolio.router)
    temp_app.include_router(photo.router)
    return temp_app

app = init_app()
def start():
    uvicorn.run("backend.app.main:app", host ="localhost", port=8000, reload=True)


if __name__ == "__main__":
    start()