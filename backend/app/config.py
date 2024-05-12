from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine

from sqlalchemy.orm import sessionmaker
from sqlmodel import SQLModel
#encryption key 
SECRET_KEY = "P2521444"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

DB_CONFIG = f"postgresql+asyncpg://postgres:IUWEXOdhBHKzqPGQDUBQYTJwQUcYUDqq@roundhouse.proxy.rlwy.net:30607/railway"

class AsyncDatabaseSession:
    def __init__(self) -> None:
        self.session = None
        self.engine = None

    def __getattr__(self, name):
        return getattr(self.session, name)

    def init(self):
        self.engine = create_async_engine(DB_CONFIG, echo=True)
        self.session = sessionmaker(self.engine, class_=AsyncSession, expire_on_commit=False)()

    async def create_all(self):
        async with self.engine.begin() as conn:
            await conn.run_sync(SQLModel.metadata.create_all)

db = AsyncDatabaseSession()

async def commit_rollback():
    try:
        await db.commit()
    except Exception:
        await db.rollback()
        raise
