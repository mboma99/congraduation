from sqlalchemy import update as sql_update
from sqlalchemy.future import select

from backend.app.config import db, commit_rollback
from backend.app.model.portfolio import Portfolio
from backend.app.repository.base_repo import BaseRepo

class PortfolioRepository(BaseRepo):
    model = Portfolio

    @staticmethod
    async def find_by_photographer_id(photographer_id: str):
        query = select(Portfolio).where(Portfolio.photographer_id == photographer_id)
        return (await db.execute(query)).scalars_one_or_none()

    @staticmethod
    async def find_by_customer_email(email: str):
        query = select(Portfolio).where(Portfolio.email == email)
        return (await db.execute(query)).scalars_one_or_none()
    
    @staticmethod
    async def find_by_portfolio_id(portfolio_id: str):
        query = select(Portfolio).where(Portfolio.id == portfolio_id)
        return (await db.execute(query)).scalars().all()

    @staticmethod
    async def update_portfolio(portfolio_id: str, new_data: dict):
        query = sql_update(Portfolio).where(Portfolio.id == portfolio_id).values(
            **new_data).execution_options(synchronize_session="fetch")
        await db.execute(query)
        await commit_rollback()
        
    @staticmethod
    async def delete_portfolio(portfolio_id: str):
        query = Portfolio.__table__.delete().where(Portfolio.id == portfolio_id)
        await db.execute(query)
        await commit_rollback()