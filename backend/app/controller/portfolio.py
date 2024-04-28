from fastapi import APIRouter, Depends, Security, HTTPException, UploadFile
from backend.app.service.schema import ResponseSchema,PortfolioResponse,PortfolioUpdateResponse, CreatePortfolioSchema
from backend.app.repository.auth_repo import JWTBearer, JWTRepo
from fastapi.security import HTTPAuthorizationCredentials
from backend.app.service.portfolio import PortfolioService
from backend.app.service.photo import PhotoService
from fastapi.responses import JSONResponse
import boto3 
import os
from dotenv import load_dotenv 
  
load_dotenv()

S3_BUCKET_NAME = os.getenv("S3_BUCKET_NAME")

router = APIRouter(
    prefix="/portfolio",
    tags=['Portfolio'],
    dependencies=[Depends(JWTBearer())]
)

@router.get("/specific_portfolio/{portfolio_id}", response_model=PortfolioResponse, response_model_exclude_none=True)
async def get_portfolio(portfolio_id: str):
    result = await PhotoService.get_photos(portfolio_id)
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

@router.put("/update_portfolio/{portfolio_id}", response_model=ResponseSchema, response_model_exclude_none=True)
async def update_portfolio(portfolio_id: str, request_body: dict, credentials: HTTPAuthorizationCredentials = Security(JWTBearer())):
    token = JWTRepo.extract_token(credentials)
    if 'email' not in token:
        return JSONResponse(status_code=403, content={"detail": "Missing email in token"})
    
    email = token['email']
    await PortfolioService.update_portfolio(portfolio_id, request_body)
    return ResponseSchema(detail="Successfully update data!")

@router.post("/create_portfolio/{photographer_id}", response_model=ResponseSchema, response_model_exclude_none=True)
async def create_portfolio(request_body: CreatePortfolioSchema, photographer_id: str):
    try:
        await PortfolioService.create_portfolio(request_body, photographer_id)
        return ResponseSchema(detail="Successfully create data!")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/{portfolio_id}/upload_photo", response_model=ResponseSchema, response_model_exclude_none=True, status_code=201)
async def upload_photo(file: UploadFile, portfolio_id: str):
    try:
        await PhotoService.create_photo(file, portfolio_id)
        return ResponseSchema(detail="Successfully create data!")
    except Exception as e:
        return ResponseSchema(detail=f"Failed to upload photo: {str(e)}", status_code=500)

@router.delete("/{portfolio_id}/delete_photo/{photo_id}", response_model=ResponseSchema, response_model_exclude_none=True)
async def delete_photo(portfolio_id: str, photo_id: str):
    try:
        await PhotoService.delete_photo(portfolio_id, photo_id)
        return ResponseSchema(detail="Successfully deleted data!")
    except Exception as e:
        # Handle any errors that occur during the deletion process
        return ResponseSchema(detail=f"Failed to delete data: {str(e)}", status_code=500)

@router.delete("/delete_portfolio/{portfolio_id}", response_model=ResponseSchema, response_model_exclude_none=True)
async def delete_portfolio(portfolio_id: str):
    await PortfolioService.delete_portfolio(portfolio_id)
    return ResponseSchema(detail="Successfully delete data!")
   
    
