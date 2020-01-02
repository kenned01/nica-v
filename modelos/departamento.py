from flask import request
from flask_restful import Resource

from middleware.authentication import authenticate
from response.response import responseok, responsefail, mensajeOk
from dababase.db import DataBase
from modelos.implementacion import departamentoImp
from json.decoder import JSONDecodeError


class departamentos(Resource):
    method_decorators = [authenticate]
    db = DataBase()

    def get(self):
        try:
            connection = self.db.connectionPool.getconn()
            cursor = connection.cursor()

            # here we retieve our data
            data = departamentoImp.getfromTable(cursor)

            cursor.close()
            self.db.connectionPool.putconn(connection)

            return responseok(data)
        except Exception:
            print(Exception.__str__())
            return responsefail()

    def post(self):
        try:

            data = request.get_json()

            if data.get("pais") is None:
                return responsefail()

            if data.get("nombre") is None:
                return responsefail()

            connection = self.db.connectionPool.getconn()
            cursor = connection.cursor()

            depts = departamentoImp.insertInTable(cursor, connection, data)

            cursor.close()
            self.db.connectionPool.putconn(connection)
            return responseok(depts)

        except (Exception, JSONDecodeError) as mensaje:
            print(mensaje.__str__())
            return responsefail()


class departamento(Resource):
    method_decorators = [authenticate]

    db = DataBase()
    def get(self, id):
        try:
            connection = self.db.connectionPool.getconn()
            cursor = connection.cursor()

            data = departamentoImp.getfromTableId(cursor, id)

            cursor.close()
            self.db.connectionPool.putconn(connection)
            return responseok(data)

        except (Exception) as error:
            print(error.__str__())
            return responsefail()

    def put(self, id):
        try:

            data = request.get_json()

            if data.get("pais") is None:
                return responsefail()

            if data.get("nombre") is None:
                return responsefail()

            connection = self.db.connectionPool.getconn()
            cursor = connection.cursor()

            data['id'] = id
            departamentoImp.updateTable(cursor, connection, data)

            cursor.close()
            self.db.connectionPool.putconn(connection)
            return mensajeOk("departamento actualizado")

        except (Exception, JSONDecodeError) as mensaje:
            print(mensaje.__str__())
            return responsefail()

    def delete(self, id):
        try:
            connection = self.db.connectionPool.getconn()
            cursor = connection.cursor()

            departamentoImp.deleteinTable(cursor, connection, id)

            cursor.close()
            self.db.connectionPool.putconn(connection)

            return mensajeOk("departamento eliminado")
        except Exception:
            print(Exception.__str__())
            return responsefail()
