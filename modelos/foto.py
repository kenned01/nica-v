import os
from flask import request
from flask_restful import Resource
from json.decoder import JSONDecodeError
# propias importaciones
from dababase.db import DataBase
from modelos.implementacion import fotoImp
from middleware.authentication import authenticate
from response.response import responseok, responsefail, mensajeError, mensajeOk

url = os.path.dirname(os.path.realpath(__file__))

UPLOAD_FOLDER = url[0: url.__len__() - 7] + "/documentos"
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif', 'svg'])


def extension_permitida(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


class fotos(Resource):
    method_decorators = [authenticate]
    db = DataBase()

    def get(self):
        try:
            connection = self.db.connectionPool.getconn()
            cursor = connection.cursor()

            data = fotoImp.getfromTable(cursor)

            cursor.close()
            self.db.connectionPool.putconn(connection)
            return responseok(data)

        except Exception as error:
            print(error.__str__())
            return responsefail()

    def post(self):
        try:
            if not request.get_json():
                foto = {
                    "idreserva": request.form['idreserva'],
                }

                if "foto" not in request.files:
                    return responsefail()

                imagen = request.files['foto']

                if imagen.filename == "":
                    responsefail()

                if extension_permitida(imagen.filename):

                    filename = "reserva_" + foto['idreserva'] + "_" + imagen.filename
                    existe = os.path.exists(UPLOAD_FOLDER + "/" + filename)

                    if not existe:

                        imagen.save(os.path.join(UPLOAD_FOLDER, filename))
                        foto['uri'] = filename

                        connection = self.db.connectionPool.getconn()
                        cursor = connection.cursor()

                        data = fotoImp.insertInTable(cursor, connection, foto)

                        cursor.close()
                        self.db.connectionPool.putconn(connection)

                        return responseok(data)
                    else:
                        return mensajeError("imagen duplicada para la misma reserva")

            else:
                foto = request.get_json()

                connection = self.db.connectionPool.getconn()
                cursor = connection.cursor()

                data = fotoImp.insertInTable(cursor, connection, foto)

                cursor.close()
                self.db.connectionPool.putconn(connection)

                return responseok(data)

        except (Exception, JSONDecodeError) as error:
            print(error.__str__())
            return responsefail()


class foto(Resource):
    method_decorators = [authenticate]
    db = DataBase()

    def get(self, id):
        try:
            connection = self.db.connectionPool.getconn()
            cursor = connection.cursor()

            data = fotoImp.getfromTableId(cursor, id)

            cursor.close()
            self.db.connectionPool.putconn(connection)
            return responseok(data)

        except Exception as error:
            print((error.__str__()))
            return responsefail()

    def delete(self, id):
        try:
            connection = self.db.connectionPool.getconn()
            cursor = connection.cursor()

            imagen = fotoImp.getfromTableId(cursor, id)

            fotoImp.deleteinTable(cursor, connection, id)

            cursor.close()
            self.db.connectionPool.putconn(connection)

            existe = os.path.exists(UPLOAD_FOLDER + "/" + imagen['uri'])
            if existe:
                os.remove(UPLOAD_FOLDER + "/" + imagen['uri'])

            return mensajeOk("foto eliminada")

        except Exception as error:
            print(error.__str__())
            return responsefail()
