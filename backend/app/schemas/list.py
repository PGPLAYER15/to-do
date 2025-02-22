from pydantic import BaseModel
from typing import List, Optional
from .card import CardResponse

class ListBase(BaseModel):
    title: str

class ListCreate(ListBase):
    board_id: int

class ListResponse(ListBase):
    id: int
    cards: List["CardResponse"] = []

    class Config:
        orm_mode = True