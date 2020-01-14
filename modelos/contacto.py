import psycopg2
from flask import request
from flask_restful import Resource
from json.decoder import JSONDecodeError
from middleware.authentication import authenticate
from response.response import responseok, responsefail, mensajeOk
from dababase.db import DataBase
from modelos.implementacion import contactoImp


class contactos(Resource):
    method_decorators = [authenticate]
    db = DataBase()

    def get(self):
        try:
            connection = self.db.connectionPool.getconn()
            cursor = connection.cursor()

            idreserva = request.args.get('idreserva', '-1')
            data = [{}]
            if idreserva != "-1":
                print("query param")
                data = contactoImp.getfromTableReserva(cursor, idreserva)
            else:
                data = contactoImp.getfromTable(cursor)

            cursor.close()
            self.db.connectionPool.putconn(connection)

            return responseok(data)

        except Exception as mensaje:
            print(mensaje.__str__())
            return responsefail()

    def post(self):
        try:
            data = request.get_json()

            connection = self.db.connectionPool.getconn()
            cursor = connection.cursor()

            data = contactoImp.insertInTable(cursor, connection, data)

            cursor.close()
            self.db.connectionPool.putconn(connection)

            return responseok(data)

        except (Exception, JSONDecodeError) as mensaje:
            print(mensaje.__str__())
            return responsefail()


class contacto(Resource):
    method_decorators = [authenticate]
    db = DataBase()

    def get(self, id):
        try:
            connection = self.db.connectionPool.getconn()
            cursor = connection.cursor()

            data = contactoImp.getfromTableId(cursor, id)

            cursor.close()
            self.db.connectionPool.putconn(connection)
            return responseok(data)

        except Exception as mensaje:
            print(mensaje.__str__())
            return responsefail()

    def put(self, id):
        try:
            data = request.get_json()
            data['id'] = id

            connection = self.db.connectionPool.getconn()
            cursor = connection.cursor()

            contactoImp.updateTable(cursor, connection, data)

            cursor.close()
            self.db.connectionPool.putconn(connection)

            return mensajeOk("contacto actualizado")
        except (Exception, JSONDecodeError) as mensaje:
            print(mensaje.__str__())
            return responsefail()

    def delete(self, id):
        try:
            connection = self.db.connectionPool.getconn()
            cursor = connection.cursor()

            contactoImp.deleteinTable(cursor, connection, id)

            cursor.close()
            self.db.connectionPool.putconn(connection)
            return mensajeOk("contacto eliminado")

        except Exception as mensaje:
            print(mensaje.__str__())
            return responsefail()
