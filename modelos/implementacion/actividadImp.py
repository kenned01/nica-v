# successful method
def getvromView(cursor):
    query = "select id, idreserva, actividad, icon from vw_actividad"
    cursor.execute(query)
    actividades = cursor.fetchall()

    data = []
    for actividad in actividades:
        data.append({
            "id": actividad[0],
            "idreserva": actividad[1],
            "actividad": actividad[2],
            "icon": actividad[3]
        })
    return data


def getfromTable(cursor):
    query = "select * from actividad"
    cursor.execute(query)
    actividades = cursor.fetchall()

    data = []
    for actividad in actividades:
        data.append({
            "id": actividad[0],
            "idreserva": actividad[1],
            "actividad": actividad[2],
            "icon": actividad[3]
        })
    return data


def getfromTableId(cursor, id):
    query = "select * from actividad where id = %s"
    params = (id,)
    cursor.execute(query, params)

    actividad = cursor.fetchone()

    if not cursor.rowcount:
        return {"mensaje": "actividad no encontrada"}

    return {
        "id": actividad[0],
        "idreserva": actividad[1],
        "actividad": actividad[2],
        "icon": actividad[3]
    }


# successful method
def insertInTable(cursor, connection, data):
    query = "insert into actividad (idreserva, actividad, icon) values (%s, %s, %s)"
    params = (data['idreserva'], data['actividad'], data['icon'])
    cursor.execute(query, params)
    connection.commit()

    query = "select * from actividad where idreserva = %s and actividad = %s"
    params = (data['idreserva'], data['actividad'])

    cursor.execute(query, params)

    actividad = cursor.fetchone()

    return {
        "id": actividad[0],
        "idreserva": actividad[1],
        "actividad": actividad[2],
        "icon": actividad[3]
    }


# successful update
def updateTable(cursor, connection, data):
    query = "update actividad set idreserva = %s, actividad = %s, icon = %s where id=%s"
    params = (data['idreserva'], data['actividad'], data['icon'], data['id'])
    cursor.execute(query, params)
    connection.commit()
    return None


# successful delete
def deleteinTable(cursor, connection, id):
    query = "delete from actividad where id=%s"
    params = (id,)
    cursor.execute(query, params)
    connection.commit()
    return None
