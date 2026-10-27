from fastapi import FastAPI, APIRouter, Query
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

PROPERTIES = [
    {"id": "luxury-apartment-juffair", "title": "Luxury Apartment Available for Sale", "location": "Juffair", "purpose": "sale", "type": "Apartment", "beds": 4, "baths": 3, "area": 200, "price": 99600, "priceLabel": "BD 99,600", "furnished": False, "featured": True, "image": "https://images.unsplash.com/photo-1757924461488-ef9ad0670978?crop=entropy&cs=srgb&fm=jpg&q=80&w=1400&auto=format&fit=crop", "blurb": "A spacious four-bedroom apartment in Juffair with 200 m² of living space and three bathrooms. Contact our team for floor plans and a private viewing."},
    {"id": "luxury-villa-barbar", "title": "4 Bedroom Luxury Villa for Rent", "location": "Barbar", "purpose": "rent", "type": "Villa", "beds": 4, "baths": None, "area": None, "price": None, "priceLabel": "Price on request", "furnished": False, "featured": True, "image": "https://images.unsplash.com/photo-1706808849780-7a04fbac83ef?crop=entropy&cs=srgb&fm=jpg&q=80&w=1400&auto=format&fit=crop", "blurb": "A four-bedroom luxury villa in Barbar, available for rent. Full details and viewing arrangements are available through our office."},
    {"id": "furnished-apartment-juffair-704", "title": "2 Bedroom Fully Furnished Apartment", "location": "Juffair", "purpose": "rent", "type": "Apartment", "beds": 2, "baths": None, "area": None, "price": 704, "priceLabel": "BD 704 / month", "furnished": True, "featured": True, "image": "https://images.unsplash.com/photo-1688646953306-5ec93eab8c06?crop=entropy&cs=srgb&fm=jpg&q=80&w=1400&auto=format&fit=crop", "blurb": "A fully furnished two-bedroom apartment in Juffair, ready to move into. Call us to arrange a viewing this week."},
    {"id": "stunning-flat-mahooz", "title": "Stunning Flat", "location": "Mahooz", "purpose": "rent", "type": "Apartment", "beds": 1, "baths": 1, "area": None, "price": 330, "priceLabel": "BD 330 / month", "furnished": False, "featured": True, "image": "https://images.unsplash.com/photo-1564078516393-cf04bd966897?crop=entropy&cs=srgb&fm=jpg&q=80&w=1400&auto=format&fit=crop", "blurb": "A well-kept one-bedroom flat in Mahooz with one bathroom. A straightforward rental in a central neighbourhood."},
    {"id": "furnished-2bhk-juffair-350", "title": "2 BHK Fully Furnished Apartment", "location": "Juffair", "purpose": "rent", "type": "Apartment", "beds": 2, "baths": None, "area": None, "price": 350, "priceLabel": "BD 350 / month", "furnished": True, "featured": True, "image": "https://images.unsplash.com/photo-1790276319227-993348bb36c7?crop=entropy&cs=srgb&fm=jpg&q=80&w=1400&auto=format&fit=crop", "blurb": "A fully furnished two-bedroom apartment in Juffair at a practical monthly rent. Good value for the area."},
    {"id": "furnished-2bhk-zinj-550", "title": "2 BHK Fully Furnished Apartment", "location": "Zinj", "purpose": "rent", "type": "Apartment", "beds": 2, "baths": None, "area": None, "price": 550, "priceLabel": "BD 550 / month", "furnished": True, "featured": True, "image": "https://images.unsplash.com/photo-1678889284769-b7dcbec1f082?crop=entropy&cs=srgb&fm=jpg&q=80&w=1400&auto=format&fit=crop", "blurb": "A fully furnished two-bedroom apartment in Zinj, close to the diplomatic quarter. Contact us for availability."},
    {"id": "furnished-2bhk-mahooz-380", "title": "2 BHK Fully Furnished Apartment", "location": "Mahooz", "purpose": "rent", "type": "Apartment", "beds": 2, "baths": None, "area": None, "price": 380, "priceLabel": "BD 380 / month", "furnished": True, "featured": False, "image": "https://images.unsplash.com/photo-1688646953306-5ec93eab8c06?crop=entropy&cs=srgb&fm=jpg&q=80&w=1400&auto=format&fit=crop", "blurb": "A fully furnished two-bedroom apartment in Mahooz. Central location, sensible rent."},
    {"id": "studio-mahooz-210", "title": "Modern Fully Furnished Studio", "location": "Mahooz", "purpose": "rent", "type": "Studio", "beds": 0, "baths": 1, "area": None, "price": 210, "priceLabel": "BD 210 / month", "furnished": True, "featured": False, "image": "https://images.unsplash.com/photo-1564078516393-cf04bd966897?crop=entropy&cs=srgb&fm=jpg&q=80&w=1400&auto=format&fit=crop", "blurb": "A modern, fully furnished studio in Mahooz. An easy first rental or a practical base in the city."},
    {"id": "apartment-sanad-160", "title": "2 BHK Apartment", "location": "Sanad", "purpose": "rent", "type": "Apartment", "beds": 2, "baths": None, "area": None, "price": 160, "priceLabel": "BD 160 / month", "furnished": False, "featured": False, "image": "https://images.unsplash.com/photo-1790276319227-993348bb36c7?crop=entropy&cs=srgb&fm=jpg&q=80&w=1400&auto=format&fit=crop", "blurb": "A two-bedroom apartment in Sanad at one of the most accessible rents on our books."},
    {"id": "furnished-1bhk-juffair-300", "title": "1 BHK Fully Furnished Apartment", "location": "Juffair", "purpose": "rent", "type": "Apartment", "beds": 1, "baths": None, "area": None, "price": 300, "priceLabel": "BD 300 / month", "furnished": True, "featured": False, "image": "https://images.unsplash.com/photo-1688646953306-5ec93eab8c06?crop=entropy&cs=srgb&fm=jpg&q=80&w=1400&auto=format&fit=crop", "blurb": "A fully furnished one-bedroom apartment in Juffair. Move-in ready, close to shops and the highway."},
    {"id": "furnished-3bhk-juffair-500", "title": "3 BHK Fully Furnished Apartment", "location": "Juffair", "purpose": "rent", "type": "Apartment", "beds": 3, "baths": None, "area": None, "price": 500, "priceLabel": "BD 500 / month", "furnished": True, "featured": False, "image": "https://images.unsplash.com/photo-1757924461488-ef9ad0670978?crop=entropy&cs=srgb&fm=jpg&q=80&w=1400&auto=format&fit=crop", "blurb": "A fully furnished three-bedroom apartment in Juffair, suited to families or sharers."},
    {"id": "family-villas-hamala", "title": "Luxury Family Villas", "location": "Hamala", "purpose": "sale", "type": "Villa", "beds": 4, "baths": None, "area": None, "price": None, "priceLabel": "Price on request", "furnished": False, "featured": False, "image": "https://images.unsplash.com/photo-1706808849780-7a04fbac83ef?crop=entropy&cs=srgb&fm=jpg&q=80&w=1400&auto=format&fit=crop", "blurb": "A collection of luxury family villas in Hamala. Sizes and prices on request through our office."},
]


@api_router.get("/")
async def root():
    return {"message": "Amazing Properties API"}


@api_router.get("/properties")
async def list_properties(
    purpose: Optional[str] = Query(None),
    location: Optional[str] = Query(None),
    type: Optional[str] = Query(None),
    beds: Optional[int] = Query(None),
    max_price: Optional[int] = Query(None),
    featured: Optional[bool] = Query(None),
):
    res = PROPERTIES
    if purpose:
        res = [p for p in res if p["purpose"] == purpose]
    if location:
        res = [p for p in res if p["location"].lower() == location.lower()]
    if type:
        res = [p for p in res if p["type"].lower() == type.lower()]
    if beds is not None:
        res = [p for p in res if (p["beds"] >= 4 if beds >= 4 else p["beds"] == beds)]
    if max_price is not None:
        res = [p for p in res if p["price"] is not None and p["price"] <= max_price]
    if featured:
        res = [p for p in res if p["featured"]]
    return {"properties": res, "count": len(res)}


class Enquiry(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    message: str


@api_router.post("/enquiries")
async def create_enquiry(enquiry: Enquiry):
    doc = enquiry.model_dump()
    doc["id"] = str(uuid.uuid4())
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    await db.enquiries.insert_one(doc)
    return {"status": "ok", "id": doc["id"]}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
