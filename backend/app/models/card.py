from sqlalchemy import Column, Integer, String, ForeignKey,Boolean
from sqlalchemy.orm import relationship
from app.models.database import Base

class Card(Base):
    __tablename__ = "cards"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    description = Column(String(500), nullable=True)
    list_id = Column(Integer, ForeignKey("lists.id"))
    check = Column(Boolean, nullable=False, default=False)

    # Relación
    list = relationship("List", back_populates="cards")