# successful method
def getfromTable(cursor):
    query = "select * from departamento"
    cursor.execute(query)
    departamentos = cursor.fetchall()

    data = []
    for departamento in departamentos:
        data.append({
            "id": departamento[0],
            "nombre": departamento[1],
            "pais": departamento[2]
        })
    return data


def getfromTableId(cursor, id):
    query = "select * from departamento where id = %s"
    params = (id,)
    cursor.execute(query, params)

    departamento = cursor.fetchone()

    if not cursor.rowcount:
        return {"mensaje": "departamento no encontrado"}

    return {
        "id": departamento[0],
        "nombre": departamento[1],
        "pais": departamento[2]
    }


# successful method
def insertInTable(cursor, connection, data):
    query = "insert into departamento (nombre, pais) values (%s,%s)"
    params = (data['nombre'], data['pais'])
    cursor.execute(query, params)
    connection.commit()

    query = "select * from departamento where nombre = %s"
    params = (data['nombre'], )
    cursor.execute(query, params)
    departamento = cursor.fetchone()

    if not cursor.rowcount:
        return {"mensaje": "departamento no encontrado"}

    return {
        "id": departamento[0],
        "nombre": departamento[1],
        "pais": departamento[2]
    }


# successful update
def updateTable(cursor, connection, data):
    query = "update departamento set nombre = %s, pais = %s where id=%s"
    params = (data['nombre'], data['pais'], data['id'])
    cursor.execute(query, params)
    connection.commit()
    return None


# successful delete
def deleteinTable(cursor, connection, id):
    query = "delete from departamento where id=%s"
    params = (id, )
    cursor.execute(query, params)
    connection.commit()
    return None
