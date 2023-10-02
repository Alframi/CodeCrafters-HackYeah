from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from database import Database
from psycopg2 import sql
from database import Database


app = FastAPI()


# Define a Pydantic model for the user data
class User(BaseModel):
    email: str
    password: str
    user_type: str


class Event(BaseModel):
    user_id: int  # Will FrontEnd have that info or they only have email and BackEnd needs to retrieve id from DB?
    event_type: str
    species_id: int  # The same concern as with 'user_id' above!!!
    animal_count: int
    latitude: float
    longitude: float
    #event_timestamp: time  # What type it supposed to be? How FrontEnd will provide it?


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/users/{email}")
async def get_user(email: str):
    db_conn = Database()
    query = sql.SQL("SELECT email, password, user_type FROM users WHERE email = {}").format(sql.Literal(email))
    user_data = db_conn.execute_query(query).fetchone()

    if not user_data:
        raise HTTPException(status_code=404, detail="Item not found")

    # extra validation - probably unnecessary
    email_from_db = user_data[0]
    if email_from_db == email:
        user = User(email=user_data[0], password=user_data[1], user_type=user_data[2])
        return user
@app.post("/users")
async def add_user(user: User):
    db_conn = Database()
    query = sql.SQL("INSERT INTO users (email, password, user_type) VALUES (%s, %s, %s)")
    user_data = (user.email, user.password, user.user_type)
    db_conn.execute_query(query, user_data)
    return user

@app.post("/users")
async def add_user(user: User):
    db_conn = Database()
    query = sql.SQL("INSERT INTO users (email, password, user_type) VALUES (%s, %s, %s)")
    user_data = (user.email, user.password, user.user_type)
    db_conn.execute_query(query, user_data)
    return user


@app.post("/events")
async def add_event(event: Event):
    db_conn = Database()

    #######################
    #######################
    #######################
    # ADD 'event_timestamp' value once agreed with FrontEnd how BackEnd is going to get that info!!!
    query = sql.SQL(
        """
        INSERT INTO events (
            user_id, event_type, species_id, animal_count, latitude, longitude
        ) VALUES (%s, %s, %s, %s, %s, %s)
        """
    )
    event_data = (
        event.user_id, event.event_type, event.species_id, event.animal_count,
        event.latitude, event.longitude
    )
    db_conn.execute_query(query, event_data)
    return event
