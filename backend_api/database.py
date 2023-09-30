import psycopg2
from psycopg2 import OperationalError
from psycopg2 import sql


class DatabaseError(Exception):
    pass

class Database:
    def __init__(self, database, user, password, host, port):
        self.database = database
        self.user = user
        self.password = password
        self.host = host
        self.port = port
        self.conn = None
        self.cur = None

    def connect(self):
        if self.conn is None:
            try:
                self.conn = psycopg2.connect(
                    database=self.database,
                    user=self.user,
                    password=self.password,
                    host=self.host,
                    port=self.port
                )
                self.conn.autocommit = True
                self.cur = self.conn.cursor()
            except psycopg2.DatabaseError:
                raise DatabaseError('Error connecting to the database.')

        return self.conn

    def execute_query(self, query, parameters=None):
        cursor = self.cur
        try:
            cursor.execute(query, parameters)
            # print(f"Query '{query}' executed successfully")
            return cursor
        except OperationalError as e:
            raise DatabaseError('DB error.')
        except psycopg2.errors.UniqueViolation as pg_err:
            raise DatabaseError('DB error.')

    def database_exists(self, db_name):
        database_list_query = "SELECT datname FROM pg_database;"

        try:
            database_list = self.execute_query(database_list_query)

            for tup in database_list:
                if tup[0] == db_name:
                    return True

            return False

        except OperationalError as e:
            raise DatabaseError('DB error.')


# db = Database("codecrafters", "testuser", "1234", "localhost", "5432")
# db.connect()

# print(db.database_exists("postgres"))
# print(db.execute_query("SELECT * FROM users").fetchall())


# email = "anna@hotmail.com"
# query = sql.SQL("SELECT email, password, user_type FROM users WHERE email = {}").format(sql.Literal(email))
# result = db.execute_query(query).fetchone()
# print(result[0])
