from sqlalchemy import update as sql_update
from sqlalchemy.future import select


from backend.app.config import db, commit_rollback
from backend.app.model.customer import Customers
from backend.app.repository.base_repo import BaseRepo


class CustomerRepository(BaseRepo):
    model = Customers

    @staticmethod
    async def find_by_username(username: str):
        query = select(Customers).where(Customers.username == username)
        return (await db.execute(query)).scalar_one_or_none()

    @staticmethod
    async def find_by_email(email: str):
        query = select(Customers).where(Customers.email == email)
        return (await db.execute(query)).scalar_one_or_none()

    @staticmethod
    async def update_password(email: str, password: str):
        query = sql_update(Customers).where(Customers.email == email).values(
            password=password).execution_options(synchronize_session="fetch")
        await db.execute(query)
        await commit_rollback()