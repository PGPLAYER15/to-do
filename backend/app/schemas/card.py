from pydantic import BaseModel
from typing import Optional

class CardBase(BaseModel):
    title: str
    description: Optional[str] = None

class CardCreate(CardBase):
    list_id: int

class CardResponse(CardBase):
    id: int

    class Config:
        orm_mode = True