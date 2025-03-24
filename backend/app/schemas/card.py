from pydantic import BaseModel
from typing import Optional

class CardBase(BaseModel):
    title: str
    description: Optional[str] = None
    check: bool = False

class CardCreate(CardBase):
    list_id: int
    
class CardUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    check: Optional[bool] = None

class CardResponse(CardBase):
    id: int

    class Config:
        orm_mode = True