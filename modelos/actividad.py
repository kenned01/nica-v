from flask import request
from flask_restful import Resource
from json.decoder import JSONDecodeError
from middleware.authentication import authenticate
from response.response import responseok, responsefail, mensajeOk
from dababase.db import DataBase
from modelos.implementacion import actividadImp


class actividades(Resource):
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
                data = actividadImp.getfromTableReserva(cursor, idreserva)
            else:
                data = actividadImp.getfromTable(cursor)

            cursor.close()
            self.db.connectionPool.putconn(connection)
            return responseok(data)
        except Exception as error:
            print(error.__str__())
            return responsefail()

    def post(self):
        try:
            actividad = request.get_json()

            connection = self.db.connectionPool.getconn()
            cursor = connection.cursor()

            actividad = actividadImp.insertInTable(cursor, connection, actividad)

            cursor.close()
            self.db.connectionPool.putconn(connection)
            return responseok(actividad)

        except (Exception, JSONDecodeError) as error:
            print(error.__str__())
            return responsefail()


class actividad(Resource):
    method_decorators = [authenticate]
    db = DataBase()

    def get(self, id):
        try:
            connection = self.db.connectionPool.getconn()
            cursor = connection.cursor()

            data = actividadImp.getfromTableId(cursor, id)

            cursor.close()
            self.db.connectionPool.putconn(connection)
            return responseok(data)

        except Exception as error:
            print(error.__str__())
            return responsefail()

    def put(self, id):
        try:
            actividad = request.get_json()
            actividad['id'] = id

            connection = self.db.connectionPool.getconn()
            cursor = connection.cursor()

            actividadImp.updateTable(cursor, connection, actividad)

            cursor.close()
            self.db.connectionPool.putconn(connection)

            return mensajeOk("actividad actualizada")
        except (Exception, JSONDecodeError) as error:
            print(error.__str__())
            return responsefail()

    def delete(self, id):
        try:
            connection = self.db.connectionPool.getconn()
            cursor = connection.cursor()

            actividadImp.deleteinTable(cursor, connection, id)

            cursor.close()
            self.db.connectionPool.putconn(connection)
            return mensajeOk("actividad eliminada")
        except Exception as error:
            print(error.__str__())
            return responsefail()