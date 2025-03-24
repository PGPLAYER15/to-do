from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.models.database import get_db
from app.models.card import Card
from app.models.list import List
from app.schemas.card import CardCreate, CardResponse ,CardUpdate

router = APIRouter()

@router.post("/create", response_model=CardResponse, status_code=status.HTTP_201_CREATED)
def create_card_simple(card_data: CardCreate, db: Session = Depends(get_db)):
    db_list = db.query(List).filter(List.id == card_data.list_id).first()
    if not db_list:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Lista no encontrada"
        )
    
    db_card = Card(**card_data.dict())
    db.add(db_card)
    db.commit()
    db.refresh(db_card)
    return db_card

@router.get("/", response_model=list[CardResponse])
def get_cards_by_list(list_id: int, db: Session = Depends(get_db)):
    cards = db.query(Card).filter(Card.list_id == list_id).all()
    return cards

@router.get("/{card_id}", response_model=CardResponse)
def get_card_by_id(card_id: int, db: Session = Depends(get_db)):
    db_card = db.query(Card).filter(Card.id == card_id).first()
    if not db_card:
        raise HTTPException(status_code=404, detail="Tarjeta no encontrada")
    return db_card

@router.put("/{card_id}", response_model=CardResponse)
def update_card(card_id: int, card_data: CardUpdate, db: Session = Depends(get_db)):
    db_card = db.query(Card).filter(Card.id == card_id).first()
    if not db_card:
        raise HTTPException(status_code=404, detail="Tarjeta no encontrada")
    
    for key, value in card_data.dict(exclude_unset=True).items():
        setattr(db_card, key, value)
    
    db.commit()
    db.refresh(db_card)
    return db_card

    
    db.commit()
    db.refresh(db_card)
    return db_card

@router.delete("/{card_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_card(card_id: int, db: Session = Depends(get_db)):
    db_card = db.query(Card).filter(Card.id == card_id).first()
    if not db_card:
        raise HTTPException(status_code=404, detail="Tarjeta no encontrada")
    
    db.delete(db_card)
    db.commit()
    return