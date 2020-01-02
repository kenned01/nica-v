import os
from flask import request
from flask_restful import Resource
from json.decoder import JSONDecodeError
from werkzeug.utils import secure_filename
from middleware.authentication import authenticate
from response.response import responseok, responsefail, mensajeOk, mensajeError
from dababase.db import DataBase
from modelos.implementacion import reservaImp

url = os.path.dirname(os.path.realpath(__file__))
UPLOAD_FOLDER = url[0: url.__len__() - 7] + "/documentos"
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif', 'svg'])


def extension_permitida(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


class reservas(Resource):
    method_decorators = [authenticate]
    db = DataBase()

    def get(self):
        try:
            connection = self.db.connectionPool.getconn()
            cursor = connection.cursor()

            data = reservaImp.getfromTable(cursor)

            cursor.close()
            self.db.connectionPool.putconn(connection)

            return responseok(data)
        except Exception as mensaje:
            print(mensaje.__str__())
            return responsefail()

    def post(self):
        try:
            if not request.get_json():
                reserva = {
                    "idDept": request.form['idDept'],
                    "nombre": request.form['nombre'],
                    "descripccion": request.form['descripccion'],
                    "coordenadas": request.form['coordenadas'],
                    "sipnosis": request.form['sipnosis']
                }
                # imafen fondo la agregaremos hasta que guardemos el archivo

                print(reserva)
                if 'imagenFondo' not in request.files:
                    print("no encontro archivo")
                    return responsefail()

                imagenFondo = request.files['imagenFondo']

                if extension_permitida(imagenFondo.filename):
                    nombreI = '_'.join(reserva['nombre'].split(' '))
                    filename = 'imagenFondo_' + nombreI + "_" + imagenFondo.filename
                    imagenFondo.save(os.path.join(UPLOAD_FOLDER, filename))
                    reserva['imagenFondo'] = filename

                # ya capturamos todos los datos ahora los vamos a guardar

                connection = self.db.connectionPool.getconn()
                cursor = connection.cursor()

                reserva = reservaImp.insertInTable(cursor, connection, reserva)

                cursor.close()
                self.db.connectionPool.putconn(connection)

                return responseok(reserva)

            else:
                reserva = request.json()
                connection = self.db.connectionPool.getconn()
                cursor = connection.cursor()

                reserva = reservaImp.insertInTable(cursor, connection, reserva)

                cursor.close()
                self.db.connectionPool.putconn(connection)

                return responseok(reserva)

        except (Exception, JSONDecodeError) as mensaje:
            print(mensaje.__str__())
            return responsefail()


class reserva(Resource):
    method_decorators = [authenticate]
    db = DataBase()

    def get(self, id):
        try:
            connection = self.db.connectionPool.getconn()
            cursor = connection.cursor()

            data = reservaImp.getfromTableId(cursor, id)

            cursor.close()
            self.db.connectionPool.putconn(connection)

            return responseok(data)
        except:
            return responsefail()

    def put(self, id):
        try:
            if not request.get_json():

                reserva = {
                    "idDept": request.form['idDept'],
                    "nombre": request.form['nombre'],
                    "descripccion": request.form['descripccion'],
                    "coordenadas": request.form['coordenadas'],
                    "sipnosis": request.form['sipnosis'],
                    "id": id
                }

                connection = self.db.connectionPool.getconn()
                cursor = connection.cursor()
                imagen = reservaImp.getfromTableId(cursor, id)
                # imagen fondo la agregaremos hasta que guardemos el archivo

                if 'imagenFondo' in request.files:
                    imagenFondo = request.files['imagenFondo']

                    if imagenFondo.filename != "":
                        if extension_permitida(imagenFondo.filename):
                            if os.path.exists(UPLOAD_FOLDER + "/" + imagen['imagenFondo']):
                                os.remove(UPLOAD_FOLDER + "/" + imagen['imagenFondo'])

                            nombreI = '_'.join(reserva['nombre'].split(' '))
                            filename = 'imagenFondo_' + nombreI + "_" + imagenFondo.filename
                            imagenFondo.save(os.path.join(UPLOAD_FOLDER, filename))
                            reserva['imagenFondo'] = filename

                # ya capturamos todos los datos ahora los vamos a guardar

                connection = self.db.connectionPool.getconn()
                cursor = connection.cursor()

                reservaImp.updateTable(cursor, connection, reserva)

                cursor.close()
                self.db.connectionPool.putconn(connection)

                return responseok(reserva)

            else:
                print('pasa')
                reserva = request.get_json()
                
                print('pasa')
                reserva["id"] = id
                connection = self.db.connectionPool.getconn()
                cursor = connection.cursor()

                print('pasa')
                reserva = reservaImp.updateTable(cursor, connection, reserva)

                cursor.close()
                self.db.connectionPool.putconn(connection)

                return responseok({"mensaje": "reserva actualizada"})

        except (Exception, JSONDecodeError) as mensaje:
            print(mensaje.__str__())
            return responsefail()

    def delete(self, id):
        try:
            connection = self.db.connectionPool.getconn()
            cursor = connection.cursor()

            imagen = reservaImp.getfromTableId(cursor, id)
            reservaImp.deleteinTable(cursor, connection, id)

            cursor.close()
            self.db.connectionPool.putconn(connection)

            if os.path.exists(UPLOAD_FOLDER + '/' + imagen['imagenFondo']):
                os.remove(UPLOAD_FOLDER + "/" + imagen['imagenFondo'])

            return mensajeOk("reserva eliminada")

        except Exception as mensaje:
            print(mensaje.__str__())
            return responsefail()
