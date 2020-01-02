# successful method
def getfromTable(cursor):
    query = "select * from reserva"
    cursor.execute(query)
    reservas = cursor.fetchall()

    data = []
    for reserva in reservas:
        data.append({
            "id": reserva[0],
            "idDept": reserva[1],
            "nombre": reserva[2],
            "descripccion": reserva[3],
            "imagenFondo": reserva[4],
            "coordenadas": reserva[5],
            "sipnosis": reserva[6]
        })
    return data


def getfromTableId(cursor, id):
    query = "select * from reserva where id = %s"
    params = (id,)
    cursor.execute(query, params)

    reserva = cursor.fetchone()

    if not cursor.rowcount:
        return {"mensaje": "reserva no encontrado"}

    return {
        "id": reserva[0],
        "idDept": reserva[1],
        "nombre": reserva[2],
        "descripccion": reserva[3],
        "imagenFondo": reserva[4],
        "coordenadas": reserva[5],
        "sipnosis": reserva[6]
    }


# successful method
def insertInTable(cursor, connection, data):
    query = "insert into reserva (iddept, nombre, descripccion, imagenfondo, coordenadas, sipnosis) " \
            "values (%s, %s, %s, %s, %s, %s) "

    params = (data['idDept'], data['nombre'], data['descripccion'],
              data['imagenFondo'], data['coordenadas'], data['sipnosis'])

    cursor.execute(query, params)
    connection.commit()

    query = "select * from reserva where idDept = %s and nombre = %s"
    params = (data['idDept'], data['nombre'])
    cursor.execute(query, params)

    reserva = cursor.fetchone()

    if not cursor.rowcount:
        return {"mensaje": "reserva no encontrado"}

    return {
        "id": reserva[0],
        "idDept": reserva[1],
        "nombre": reserva[2],
        "descripccion": reserva[3],
        "imagenFondo": reserva[4],
        "coordenadas": reserva[5],
        "sipnosis": reserva[6]
    }


# successful update
def updateTable(cursor, connection, data):

    if "imagenFondo" not in data:
        query = "update reserva set iddept = %s, nombre=%s, descripccion=%s, " \
            "coordenadas=%s, sipnosis=%s where id=%s"

        params = (data['idDept'], data['nombre'], data['descripccion'],
                  data['coordenadas'], data['sipnosis'], data['id'])

        cursor.execute(query, params)
        connection.commit()
    else:
        query = "update reserva set iddept = %s, nombre=%s, descripccion=%s, imagenfondo=%s," \
                "coordenadas=%s, sipnosis=%s where id=%s"

        params = (data['idDept'], data['nombre'], data['descripccion'],
                  data['imagenFondo'], data['coordenadas'], data['sipnosis'], data['id'])

        cursor.execute(query, params)
        connection.commit()
    return None


# successful delete
def deleteinTable(cursor, connection, id):
    query = "delete from reserva where id=%s"
    params = (id, )
    cursor.execute(query, params)
    connection.commit()
    return None
