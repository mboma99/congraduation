from fastapi import APIRouter, Depends, Security
from fastapi import HTTPException
from backend.app.service.schema import ResponseSchema,PortfolioResponse
from backend.app.repository.auth_repo import JWTBearer, JWTRepo
from fastapi.security import HTTPAuthorizationCredentials
from backend.app.service.portfolio import PortfolioService
from fastapi.responses import JSONResponse

router = APIRouter(
    prefix="/porfolio",
    tags=['Portfolio'],
    dependencies=[Depends(JWTBearer())]
)

@router.get("/specific_portfolio/{portfolio_id}", response_model=PortfolioResponse, response_model_exclude_none=True)
async def get_portfolio(portfolio_id: str):
    result = await PortfolioService.get_portfolio(portfolio_id)
    if result:
        return result
    else:
        return ResponseSchema(detail="Portfolio not found", result=None)

@router.get("/all_portfolios/{photographer_id}", response_model=ResponseSchema, response_model_exclude_none=True)
async def get_all_portfolios(credentials: HTTPAuthorizationCredentials = Security(JWTBearer()), photographer_id: str = None):
    token = JWTRepo.extract_token(credentials)
    if 'email' not in token:
        return JSONResponse(status_code=403, content={"detail": "Missing email in token"})
    
    email = token['email']
    result = await PortfolioService.get_portfolios(photographer_id)
    if result:
        return ResponseSchema(detail="Successfully fetch data!", result=result)
    else:
        return ResponseSchema(detail="No portfolios found for the user", result=None)
