from sqlalchemy import update as sql_update
from sqlalchemy.future import select

from app.config import db, commit_rollback
from app.model.portfolio import Portfolio
from app.repository.base_repo import BaseRepo

class PortfolioRepository(BaseRepo):
    model = Portfolio

    @staticmethod
    async def find_by_photographer_id(photographer_id: str):
        query = select(Portfolio).where(Portfolio.photographer_id == photographer_id)
        result = await db.execute(query)
        return (await db.execute(query)).scalars().all()

    @staticmethod
    async def find_by_customer_email(email: str):
        query = select(Portfolio).where(Portfolio.customer_email == email)
        return (await db.execute(query)).scalars().all()
    
    @staticmethod
    async def find_by_portfolio_id(portfolio_id: str):
        query = select(Portfolio).where(Portfolio.id == portfolio_id)
        return (await db.execute(query)).scalars().all()
