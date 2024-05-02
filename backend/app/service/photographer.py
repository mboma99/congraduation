from fastapi import HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.future import select
from backend.app.model import Photographer, Person,Portfolio
from backend.app.config import db
from backend.app.repository.photographer import PhotographerRepository
from backend.app.repository.person import PersonRepository
from backend.app.service.schema import PhotographerProfileResponse, PhotographerUpdateSchema,PersonProfileUpdate

class PhotographerService:
    @staticmethod
    async def get_photographer(email:str):
        _photographer = await PhotographerRepository.find_by_email(email)
        if _photographer:
            _profile = await PersonRepository.get_by_id(_photographer.person_id)
            _photographer_dict = {
                'id': _photographer.id,
                'email': _photographer.email,
                'first_name': _profile.first_name,
                'last_name': _profile.last_name,
                'phone_number': _profile.phone_number,
                'user_type': 'photographer'
            }
            return PhotographerProfileResponse(**_photographer_dict) 
        raise HTTPException(status_code=404, detail="Photographer not found")        
    
    @staticmethod
    async def update_photographer_profile(email: str, new_data: PhotographerUpdateSchema):
        _photographer = await PhotographerRepository.find_by_email(email)
        if _photographer:
            await PhotographerRepository.update(_photographer.id, email=new_data.email)
            return {"status": "success", "message": "Photographer profile updated successfully"}
        else:
            raise HTTPException(status_code=404, detail="Photographer not found")

    @staticmethod
    async def update_person_profile(email: str, new_data: dict):
        _photographer = await PhotographerRepository.find_by_email(email)
        if _photographer:
            _profile = await PersonRepository.get_by_id(_photographer.person_id)
            await PersonRepository.update(_profile.id, **new_data)
            return {"status": "success", "message": "Photographer profile updated successfully"}
        else:
            raise HTTPException(status_code=404, detail="Photographer not found")
        