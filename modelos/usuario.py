import os
from flask import request
from flask_restful import Resource
from werkzeug.utils import secure_filename
from json.decoder import JSONDecodeError
# own imports
from middleware.authentication import authenticate
from response.response import responseok, responsefail, mensajeOk
from dababase.db import DataBase
from modelos.implementacion import usuarioImp

url = os.path.dirname(os.path.realpath(__file__))

UPLOAD_FOLDER = url[0: url.__len__() - 7] + "/documentos"
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif', 'svg'])


def extension_permitida(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


class usuarios(Resource):
    method_decorators = [authenticate]
    db = DataBase()

    def get(self):
        try:
            connection = self.db.connectionPool.getconn()
            cursor = connection.cursor()

            # here we retieve our data
            data = usuarioImp.getfromTable(cursor)

            cursor.close()
            self.db.connectionPool.putconn(connection)
            return responseok(data)
        except Exception:
            print(Exception.__str__())
            return responsefail()

    def post(self):
        try:
            usuario = {}
            if not request.get_json():

                usuario = {"usuario": request.form['usuario'], 'password': request.form['password']}

                # we need to save the image
                if 'avatar' not in request.files:
                    return responsefail()

                file = request.files['avatar']

                if file.filename == '':
                    return responsefail()

                if extension_permitida(file.filename):
                    filename = usuario['usuario'] + "_" + secure_filename(file.filename)
                    file.save(os.path.join(UPLOAD_FOLDER, filename))
                    usuario['avatar'] = filename

                # insert to database all the data we get from form
                connection = self.db.connectionPool.getconn()
                cursor = connection.cursor()

                # here we retieve our data
                usuario = usuarioImp.insertInTable(cursor, connection, usuario)

                cursor.close()
                self.db.connectionPool.putconn(connection)

            else:
                usuario = request.get_json()

                # insert to database all the data we get from json
                connection = self.db.connectionPool.getconn()
                cursor = connection.cursor()

                # here we retieve our data
                usuario = usuarioImp.insertInTable(cursor, connection, usuario)

                cursor.close()
                self.db.connectionPool.putconn(connection)

            return responseok(usuario)
        except (Exception, JSONDecodeError) as mensaje:
            print(mensaje.__str__())
            return responsefail()


class usuario(Resource):
    method_decorators = [authenticate]

    db = DataBase()

    def get(self, id):
        try:
            connection = self.db.connectionPool.getconn()
            cursor = connection.cursor()
            # here we retieve our data
            data = usuarioImp.getfromTableId(cursor, id)

            cursor.close()
            self.db.connectionPool.putconn(connection)
            return responseok(data)
        except:
            return responsefail()

    def put(self, id):
        try:
            usuario = {}
            if not request.get_json():

                usuario = {'password': request.form['password'], "id": id, 'usuario': request.form['usuario']}
                connection = self.db.connectionPool.getconn()
                cursor = connection.cursor()

                avatar = usuarioImp.getfromTableId(cursor, id)

                # we need to save the image
                if "avatar" in request.files:
                    file = request.files['avatar']
                    if file.filename != '':
                        if extension_permitida(file.filename):
                            if os.path.exists(UPLOAD_FOLDER + '/' + avatar['avatar']):
                                os.remove(UPLOAD_FOLDER + '/' + avatar['avatar'])

                            filename = usuario['usuario'] + "_" + secure_filename(file.filename)
                            file.save(os.path.join(UPLOAD_FOLDER, filename))
                            usuario['avatar'] = filename

                # insert to database all the data we get from form
                connection = self.db.connectionPool.getconn()
                cursor = connection.cursor()

                # here we retieve our data
                usuarioImp.updateTable(cursor, connection, usuario)

                cursor.close()
                self.db.connectionPool.putconn(connection)

            else:
                usuario = request.get_json()

                usuario["id"] = id
                # insert to database all the data we get from json

                connection = self.db.connectionPool.getconn()
                cursor = connection.cursor()

                # here we retieve our data
                usuarioImp.updateTable(cursor, connection, usuario)

                cursor.close()
                self.db.connectionPool.putconn(connection)

            usuario["password"] = "********"
            return responseok(usuario)
        except Exception as mensaje:
            print(mensaje.__str__())
            return responsefail()

    def delete(self, id):
        try:
            connection = self.db.connectionPool.getconn()
            cursor = connection.cursor()

            # here we retieve our data
            avatar = usuarioImp.getfromTableId(cursor, id)
            usuarioImp.deleteinTable(cursor, connection, id)

            cursor.close()
            self.db.connectionPool.putconn(connection)

            if os.path.exists(UPLOAD_FOLDER + '/' + avatar['avatar']):
                os.remove(UPLOAD_FOLDER + '/' + avatar['avatar'])

            return mensajeOk("usuario eliminado")

        except Exception as error:
            print(error.__str__())
            return responsefail()
