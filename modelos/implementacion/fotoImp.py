# successful method
def getfromView(cursor):
    query = "select id, idreserva, uri, nombrereserva from vw_foto"
    cursor.execute(query)
    fotos = cursor.fetchall()

    data = []
    for foto in fotos:
        data.append({
            "id": foto[0],
            "idreserva": foto[1],
            "uri": foto[2],
            "nombrereserva": foto[3]
        })
    return data


def getfromTable(cursor):
    query = "select * from foto"
    cursor.execute(query)
    fotos = cursor.fetchall()

    data = []
    for foto in fotos:
        data.append({
            "id": foto[0],
            "idreserva": foto[1],
            "uri": foto[2]
        })
    return data


def getfromTableId(cursor, id):
    query = "select * from foto where id = %s"
    params = (id,)
    cursor.execute(query, params)

    foto = cursor.fetchone()

    if not cursor.rowcount:
        return {"mensaje": "foto no encontrada"}

    return {
        "id": foto[0],
        "idreserva": foto[1],
        "uri": foto[2]
    }


# successful method
def insertInTable(cursor, connection, data):
    query = "insert into foto (idreserva, uri) values (%s,%s)"
    params = (data['idreserva'], data['uri'])
    cursor.execute(query, params)
    connection.commit()

    query = "select * from foto where uri = %s"
    params = (data['uri'], )
    cursor.execute(query, params)

    foto = cursor.fetchone()

    return {
        "id": foto[0],
        "idreserva": foto[1],
        "uri": foto[2]
    }


# successful update
def updateTable(cursor, connection, data):
    query = "update foto set idreserva = %s, uri=%s where id=%s"
    params = (data['idreserva'], data['uri'], data['id'])
    cursor.execute(query, params)
    connection.commit()
    return None


# successful delete
def deleteinTable(cursor, connection, id):
    query = "delete from foto where id=%s"
    params = (id, )
    cursor.execute(query, params)
    connection.commit()
    return None
