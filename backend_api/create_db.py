import psycopg2
from psycopg2 import sql
from database import Database


# Create required database
def create_db(db_conn, db_name):
    query = sql.SQL("CREATE DATABASE {db_name};").format(db_name=sql.Identifier(db_name))
    db_conn.execute_query(query)


# Create the database schema
def create_tables(db_conn):
    commands = [
        """
        CREATE TABLE IF NOT EXISTS users (
            user_id SERIAL PRIMARY KEY,
            password VARCHAR(255),
            email VARCHAR(255),
            user_type VARCHAR(20)
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS animals (
            species_id SERIAL PRIMARY KEY,
            info TEXT,
            tips TEXT,
            photo_path VARCHAR(255)
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS articles (
            species_id INT REFERENCES animals (species_id),
            article_link VARCHAR(255)
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS events (
            event_id SERIAL PRIMARY KEY,
            user_id INT REFERENCES users (user_id),
            event_type VARCHAR(255),
            species_id INT REFERENCES animals (species_id),
            animal_count INT,
            event_timestamp TIMESTAMP,
            report_timestamp TIMESTAMP DEFAULT NOW()
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS events_photos (
            event_id INT REFERENCES events (event_id),
            event_photo_path VARCHAR(255)
        )
        """
    ]

    for command in commands:
        db_conn.execute_query(command)


if __name__ == "__main__":
    db_conn = Database(db_name='postgres')
    new_db_name = 'test3'
    if not db_conn.database_exists(new_db_name):
        create_db(db_conn, new_db_name)
        del db_conn
        new_db_conn = Database(db_name=new_db_name)
        create_tables(new_db_conn)
