from psycopg2 import sql
from database import Database
from decouple import config


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
            species_name TEXT,
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
            latitude FLOAT,
            longitude FLOAT,
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


def fill_db_with_data(db_conn):
    query_list = [
        # user_type is one of: 'specialist', 'non-profit', 'services' or 'user'.
        """
        INSERT INTO users (email, password, user_type) 
        VALUES 
            ('anna@rescueanimals.org', 'password123', 'non-profit'),
            ('adam@policja.gov', 'password123', 'services'),
            ('jan@weterynarz.pl', 'password123', 'specialist'),
            ('marcin@gmail.com', 'password123', 'user');
        """,
        """
        INSERT INTO animals (species_name, info, tips, photo_path)
        VALUES
            ('pies', 
            'Udomowiony gatunek (lub podgatunek) ssaka drapieżnego z rodziny psowatych (Canidae), traktowany przez 
            niektóre ujęcia systematyczne za podgatunek wilka, a przez inne za odrębny gatunek.', 
            'Spotkanie z groźnym psem może być niebezpieczne, dlatego ważne jest zachowanie odpowiednich środków 
            ostrożności: Zachowaj spokój, zachowaj dystans, nie odwracaj pleców, nie wyzywaj i nie kontaktuj się wzrokowo.',
            '/img/pies.jpg'),
            ('kot', 
            'Udomowiony gatunek ssaka z rzędu drapieżnych z rodziny kotowatych. Koty zostały udomowione około 
            9500 lat temu i są obecnie najpopularniejszymi zwierzętami domowymi na świecie.',
            'Spotkanie z dzikim kotem może być potencjalnie niebezpieczne, dlatego ważne jest, aby zachować ostrożność. 
            Oto kilka porad: Zachowuj spokój, nie zbliżaj się, nie odwracaj się plecami i nie uciekaj, unikaj kontaktu wzrokowego.',
            '/img/kot.jpg'),
            ('dzik', 
            'Dzik euroazjatycki, dzik (Sus scrofa) to gatunek dużego, lądowego ssaka łożyskowego z rodziny świniowatych 
            (Suidae). Sus scrofa jest jedynym przedstawicielem dziko żyjących świniowatych w Europie. Jest także 
            przodkiem świni domowej.', 
            'Spotkanie dzika może być niebezpieczne, dlatego ważne jest zachowanie ostrożności i odpowiednich środków 
            bezpieczeństwa. Oto kilka porad: Zachowaj spokój, nie zbliżaj się, nie karm dzika, odsuń się powoli, nie 
            blokuj drogi ucieczki, poinformuj odpowiednie służby.',
            '/img/dzik.jpg')
        """,
        """
        INSERT INTO articles (species_id, article_link)
        VALUES
            (1, 'https://pl.wikipedia.org/wiki/Pies_domowy'),
            (1, 'https://slaska.policja.gov.pl/kat/prewencja/kraina-sznupka/sznupek-radzi/82837,JAK-ZACHOWAC-SIE-W-RAZIE-ATAKU-PSA.html'),
            (2, 'https://pl.wikipedia.org/wiki/Kot_domowy'),
            (2, 'https://www.zooplus.pl/magazyn/koty/adopcja-kota/co-robic-gdy-przyblaka-sie-kot'),
            (3, 'https://pl.wikipedia.org/wiki/Dzik_euroazjatycki'),
            (3, 'https://piaseczno.eu/sposob-postepowania-w-przypadku-spotkania-dzika/')
        """,
        """
        INSERT INTO events (user_id, event_type, species_id, animal_count, latitude, longitude)
        VALUES
            (3, 'danger wild animal', 3, 5, 50.0667161, 19.9902398),
            (1, 'dead animal', 1, 1, 50.0687161, 19.9909398)
        """,
        """
        INSERT INTO events_photos (event_id, event_photo_path)
        VALUES
            (1, '/img/grozny_dzik.jpg'),
            (2, '/img/martwy_pies.jpg')
        """
    ]

    for query in query_list:
        db_conn.execute_query(query)


if __name__ == "__main__":
    db_conn = Database(db_name='postgres')
    new_db_name = config('DB_NAME')

    if not db_conn.database_exists(new_db_name):
        create_db(db_conn, new_db_name)
        del db_conn
        new_db_conn = Database(db_name=new_db_name)
        create_tables(new_db_conn)
        fill_db_with_data(new_db_conn)
