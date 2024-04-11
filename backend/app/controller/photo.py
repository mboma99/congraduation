from fastapi import APIRouter, Depends, Security
from fastapi import HTTPException
from backend.app.service.schema import ResponseSchema,PortfolioResponse,PortfolioUpdateResponse, PhotoResponse, PhotosResponse
from backend.app.repository.auth_repo import JWTBearer, JWTRepo
from fastapi.security import HTTPAuthorizationCredentials
from backend.app.service.portfolio import PortfolioService
from backend.app.service.photo import PhotoService
from fastapi.responses import JSONResponse


router = APIRouter(
    prefix="/photo",
    tags=['Photo'],
    dependencies=[]
)

@router.get("/specific_photo/{photo_id}", response_model=PhotoResponse, response_model_exclude_none=True)
async def get_photo(photo_id: str):
    result = await PhotoService.get_photo(photo_id)
    if result:
        return result
    else:
        return ResponseSchema(detail="Photo not found", result=None)

@router.get("/all_photos/{portfolio_id}", response_model=PhotosResponse, response_model_exclude_none=True)
async def get_all_photos(portfolio_id: str):
    result = await PhotoService.get_photos(portfolio_id)
    if result:
        return result
    else:
        return ResponseSchema(detail="No photos found for the portfolio", result=None)