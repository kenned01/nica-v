import os
from flask import Flask, render_template, send_from_directory
from flask_restful import Api

# import all the models
from modelos.usuario import *
from modelos.departamento import *
from modelos.reserva import *
from modelos.contacto import *
from modelos.actividad import *
from modelos.foto import *

# implamentacion
from modelos.implementacion import *
app = Flask(__name__)
api = Api(app)
url = os.path.dirname(os.path.realpath(__file__))
UPLOAD_FOLDER = url + "/documentos"

# making default routes pages
@app.route("/")
def index():
    return render_template("web-index.html")


# making default routes pages
@app.route("/404")
def page404():
    return render_template("404.html")


# admin URL
@app.route("/nv-login")
def login():
    return render_template("admin/login.html")


@app.route("/admin-actividad")
def actividad_registro():
    try:
        db = DataBase()
        connection = db.connectionPool.getconn()
        cursor = connection.cursor()

        datos = actividadImp.getvromView(cursor)

        cursor.close()
        db.connectionPool.putconn(connection)
        return render_template("admin-actividad/registros.html", datos=datos)    
    except Exception as error:
        print(error.__str__())
    

@app.route("/admin-actividad/registro")
def actividad_form():
    try:
        db = DataBase()
        connection = db.connectionPool.getconn()
        cursor = connection.cursor()

        datos = reservaImp.getfromTable(cursor)
        
        cursor.close()
        db.connectionPool.putconn(connection)
        return render_template("admin-actividad/formulario.html", reservas=datos)
    except Exception as error:
        print(error.__str__())
    

@app.route("/admin-dept")
def dept_registro():
    try:
        db = DataBase()
        connection = db.connectionPool.getconn()
        cursor = connection.cursor()

        datos = departamentoImp.getfromTable(cursor)
        
        cursor.close()
        db.connectionPool.putconn(connection)
        return render_template("admin-dept/registros.html", departamentos = datos)
    except Exception as error:
        print(error.__str__())
 
    
@app.route("/admin-dept/registro")
def dept_form():
    return render_template("admin-dept/formulario.html")


@app.route("/admin-contacto")
def contacto_registro():
    try:
        db = DataBase()
        connection = db.connectionPool.getconn()
        cursor = connection.cursor()

        datos = contactoImp.getfromView(cursor)
        
        cursor.close()
        db.connectionPool.putconn(connection)
        return render_template("admin-contacto/registros.html", contactos = datos)
    except Exception as error:
        print(error.__str__())


@app.route("/admin-contacto/registro")
def contacto_form():
    try:
        param = request.args.get("id", None)

        db = DataBase()
        connection = db.connectionPool.getconn()
        cursor = connection.cursor()

        datos = contactoImp.get_disponible(cursor, param)
        
        cursor.close()
        db.connectionPool.putconn(connection)
        return render_template("admin-contacto/formulario.html", reservas=datos)

    except Exception as error:
        print(error.__str__())


@app.route("/admin-user")
def usuario_registro():
    try:
        db = DataBase()
        connection = db.connectionPool.getconn()
        cursor = connection.cursor()

        datos = usuarioImp.getfromTable(cursor)
        
        cursor.close()
        db.connectionPool.putconn(connection)

        return render_template("admin-usuario/registros.html", usuarios= datos)
    except Exception as error:
        print(error.__str__())


@app.route("/admin-user/registro")
def usuario_form():
    try:
        return render_template("admin-usuario/formulario.html")
    except Exception as error:
        print(error.__str__())


@app.route("/admin-reserva")
def reserva_registro():
    try:
        db = DataBase()
        connection = db.connectionPool.getconn()
        cursor = connection.cursor()

        datos = reservaImp.getfromTable(cursor)
        
        cursor.close()
        db.connectionPool.putconn(connection)

        return render_template("admin-reserva/registros.html", reservas=datos)
    except Exception as error:
        print(error.__str__())

@app.route("/admin-reserva/registro")
def reserva_form():
    try:
        db = DataBase()
        connection = db.connectionPool.getconn()
        cursor = connection.cursor()

        datos = departamentoImp.getfromTable(cursor)
        
        cursor.close()
        db.connectionPool.putconn(connection)
        return render_template("admin-reserva/formulario.html", departamentos = datos)
    except Exception as error:
        print(error.__str__())


@app.route("/admin-foto")
def foto_registro():
    try:
        db = DataBase()
        connection = db.connectionPool.getconn()
        cursor = connection.cursor()

        datos = fotoImp.getfromView(cursor)
        
        cursor.close()
        db.connectionPool.putconn(connection)
        return render_template("admin-foto/registros.html", fotos = datos)
    except Exception as error:
        print(error.__str__())


@app.route("/admin-foto/registro")
def foto_form():
    try:
        db = DataBase()
        connection = db.connectionPool.getconn()
        cursor = connection.cursor()

        datos = reservaImp.getfromTable(cursor)
        
        cursor.close()
        db.connectionPool.putconn(connection)
        return render_template("admin-foto/formulario.html", reservas = datos)
    except Exception as error:
        print(error.__str__())


@app.route('/multimedia/<filename>')
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER,filename)

# erorres
@app.errorhandler(404)
def notFound(e):
    return render_template("404.html")


# adding routes for the API
api.add_resource(usuarios, '/nv-api/usuarios')
api.add_resource(usuario, '/nv-api/usuarios/<int:id>')
api.add_resource(departamentos, '/nv-api/departamentos')
api.add_resource(departamento, '/nv-api/departamentos/<int:id>')
api.add_resource(reservas, '/nv-api/reservas')
api.add_resource(reserva, '/nv-api/reservas/<int:id>')
api.add_resource(contactos, '/nv-api/contactos')
api.add_resource(contacto, '/nv-api/contactos/<int:id>')
api.add_resource(actividades, '/nv-api/actividades')
api.add_resource(actividad, '/nv-api/actividades/<int:id>')
api.add_resource(fotos, '/nv-api/fotos')
api.add_resource(foto, '/nv-api/fotos/<int:id>')

# setting port to our application
if __name__ == '__main__':
    # Threaded option to enable multiple instances for multiple user access support
    app.run(threaded=True, port=5000)
