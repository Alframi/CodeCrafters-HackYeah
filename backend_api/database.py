import psycopg2
from psycopg2 import OperationalError
from decouple import config


class DatabaseError(Exception):
    pass


class Database:
    # def __init__(self, database, user, password, host, port):
    def __init__(self, db_name=None):
        self.user = config('USERNAME')
        self.password = config('PASSWORD')
        self.host = config('HOST')
        self.port = config('PORT')
        self.db_name = db_name or config('DB_NAME')
        self.conn = self.connect()
        self.cur = None

    def connect(self):
        connection = None
        try:
            connection = psycopg2.connect(
                user=self.user,
                password=self.password,
                host=self.host,
                port=self.port,
                database=self.db_name
            )
            connection.autocommit = True
        except psycopg2.DatabaseError:
            raise DatabaseError('Error connecting to the database.')

        return connection

    def execute_query(self, query, parameters=None):
        cursor = self.conn.cursor()
        try:
            cursor.execute(query, parameters)
            return cursor
        except OperationalError as e:
            raise DatabaseError(f'DB error. {e}')
        except psycopg2.errors.UniqueViolation as pg_err:
            raise DatabaseError(f'DB error. {pg_err}')

    def database_exists(self, db_name):
        database_list_query = "SELECT datname FROM pg_database;"

        try:
            database_list = self.execute_query(database_list_query)

            for tup in database_list:
                if tup[0] == db_name:
                    return True

            return False

        except OperationalError as e:
            raise DatabaseError(f'DB error.{e}')
