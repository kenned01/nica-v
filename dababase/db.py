import psycopg2
from psycopg2 import pool


class DataBase(object):

    class __DataBase:
        def __init__(self):
            self.connectionPool = getConnectionPool()

        def __str__(self):
            return self

        def close(self):
            # close all connections
            if self.connectionPool:
                self.connectionPool.closeall

    instance = None

    def __new__(cls):
        if not DataBase.instance:
            DataBase.instance = DataBase.__DataBase()
        return DataBase.instance


def getConnectionPool():
    connectionPool = None

    try:
        connectionPool = psycopg2.pool.SimpleConnectionPool(
            1,
            20,
            user="kkyyucywmdkqrk",
            password="9e96d4438289b729f5ab9320b9528d4e3373d0f7a9632b87fb37ab3d54e54a88",
            host="ec2-107-21-235-87.compute-1.amazonaws.com",
            port="5432",
            database="damnbiuae33fka")

    except (Exception, psycopg2.Error) as error:
        print("Error while connecting to PostgreSQL " + error.__str__())

    return connectionPool
