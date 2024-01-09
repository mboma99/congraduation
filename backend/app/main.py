import uvicorn
from fastapi import FastAPI, APIRouter
from backend.app.config import db

#app = FastAPI()
#router = APIRouter()

def init_app():
    db.init()

    temp_app = FastAPI(
        title="Congraduation",
        description="Login Page",
        version="1"
    )

    router = APIRouter()
    @temp_app.on_event("startup")
    async def startup():
        await db.create_all()

    @temp_app.on_event("shutdown")
    async def shutdown():
        await db.close()

    from backend.app.controller import authentication, customers
    temp_app.include_router(authentication.router)
    temp_app.include_router(customers.router)
    return temp_app

app = init_app()
def start():
    uvicorn.run("backend.app.main:app", host ="localhost", port=8000, reload=True)


if __name__ == "__main__":
    start()