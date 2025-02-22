from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.models.database import get_db
from app.models.card import Card
from app.models.list import List  # Para validar que la lista existe
from app.schemas.card import CardCreate, CardResponse

router = APIRouter()

@router.post("/cards/", response_model=CardResponse, status_code=status.HTTP_201_CREATED)
def create_card(card_data: CardCreate, db: Session = Depends(get_db)):
    # Verificar que la lista existe
    db_list = db.query(List).filter(List.id == card_data.list_id).first()
    if not db_list:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Lista no encontrada"
        )
    
    # Crear la tarjeta
    db_card = Card(**card_data.dict())
    db.add(db_card)
    db.commit()
    db.refresh(db_card)
    return db_card

@router.get("/lists/{list_id}/cards/", response_model=list[CardResponse])
def get_cards_by_list(list_id: int, db: Session = Depends(get_db)):
    cards = db.query(Card).filter(Card.list_id == list_id).all()
    return cards

@router.put("/cards/{card_id}", response_model=CardResponse)
def update_card(card_id: int, card_data: CardCreate, db: Session = Depends(get_db)):
    db_card = db.query(Card).filter(Card.id == card_id).first()
    if not db_card:
        raise HTTPException(status_code=404, detail="Tarjeta no encontrada")
    
    for key, value in card_data.dict().items():
        setattr(db_card, key, value)
    
    db.commit()
    db.refresh(db_card)
    return db_card

@router.delete("/cards/{card_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_card(card_id: int, db: Session = Depends(get_db)):
    db_card = db.query(Card).filter(Card.id == card_id).first()
    if not db_card:
        raise HTTPException(status_code=404, detail="Tarjeta no encontrada")
    
    db.delete(db_card)
    db.commit()
    return