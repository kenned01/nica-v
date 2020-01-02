# successful method
# idreserva, correo, numero, direccion


def get_disponible(cursor, param):
    query = "select idreserva, id from contacto"
    cursor.execute(query)
    reserva_ocupado = cursor.fetchall()

    query = "select id, nombre from reserva"
    cursor.execute(query)
    reservas = cursor.fetchall()

    query = "select id, nombre from reserva"
    cursor.execute(query)
    reservaTemp = cursor.fetchall()

    for reserva in reservas:
        for ocupado in reserva_ocupado:
            if param is None:
                if str(reserva[0]) == str(ocupado[0]):
                    reservaTemp.remove(reserva)
            else:
                if reserva[0] == ocupado[0] and str(ocupado[1]) != param:
                    reservaTemp.remove(reserva)

    return reservaTemp


def getfromView(cursor):
    query = "select id, idreserva, correo, numero, direccion from vw_contacto"
    cursor.execute(query)
    contactos = cursor.fetchall()

    data = []
    for contacto in contactos:
        data.append({
            "id": contacto[0],
            "idreserva": contacto[1],
            "correo": contacto[2],
            "numero": contacto[3],
            "direccion": contacto[4]
        })

    return data


def getfromTable(cursor):
    query = "select * from contacto"
    cursor.execute(query)
    contactos = cursor.fetchall()

    data = []
    for contacto in contactos:
        data.append({
            "id": contacto[0],
            "idreserva": contacto[1],
            "correo": contacto[2],
            "numero": contacto[3],
            "direccion": contacto[4]
        })

    return data


def getfromTableId(cursor, id):
    query = "select * from contacto where id = %s"
    params = (id,)
    cursor.execute(query, params)

    contacto = cursor.fetchone()

    if not cursor.rowcount:
        return {"mensaje": "contacto no encontrado"}

    return {
        "id": contacto[0],
        "idreserva": contacto[1],
        "correo": contacto[2],
        "numero": contacto[3],
        "direccion": contacto[4]
    }


# successful method
def insertInTable(cursor, connection, data):
    query = "insert into contacto (idreserva, correo, numero, direccion) values (%s, %s, %s, %s)"
    params = (data['idreserva'], data['correo'], data['numero'], data['direccion'])
    cursor.execute(query, params)
    connection.commit()

    query = "select * from contacto where correo = %s and idreserva = %s"
    params = (data['correo'], data['idreserva'])
    cursor.execute(query, params)

    contacto = cursor.fetchone()

    return {
        "id": contacto[0],
        "idreserva": contacto[1],
        "correo": contacto[2],
        "numero": contacto[3],
        "direccion": contacto[4]
    }


# successful update
def updateTable(cursor, connection, data):
    query = "update contacto set idreserva = %s, correo = %s, numero =%s, direccion = %s where id=%s"
    params = (data['idreserva'], data['correo'], data['numero'], data['direccion'], data['id'])
    cursor.execute(query, params)
    connection.commit()
    return None


# successful delete
def deleteinTable(cursor, connection, id):
    query = "delete from contacto where id=%s"
    params = (id,)
    cursor.execute(query, params)
    connection.commit()
    return None
