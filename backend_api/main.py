from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from database import Database
from psycopg2 import sql


app = FastAPI()


# Define a Pydantic model for the user data
class User(BaseModel):
    email: str
    password: str
    user_type: str


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/users/{email}")
async def get_user(email: str):
    db = Database("codecrafters", "testuser", "1234", "localhost", "5432")
    db.connect()

    query = sql.SQL("SELECT email, password, user_type FROM users WHERE email = {}").format(sql.Literal(email))
    user_data = db.execute_query(query).fetchone()

    if not user_data:
        raise HTTPException(status_code=404, detail="Item not found")

    # extra validation - probably unnecessary
    email_from_db = user_data[0]
    if email_from_db == email:
        user = User(email=user_data[0], password=user_data[1], user_type=user_data[2])
        return user

@app.post("/users")
async def add_user(user: User):
    db = Database("codecrafters", "testuser", "1234", "localhost", "5432")
    db.connect()

    query = sql.SQL("INSERT INTO users (email, password, user_type) VALUES (%s, %s, %s)")
    user_data = (user.email, user.password, user.user_type)
    db.execute_query(query, user_data)
    return user