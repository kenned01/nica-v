# successful method
# id, usuario, password, avatar


def getfromTable(cursor):
    query = "select * from usuario"
    cursor.execute(query)
    users = cursor.fetchall()

    data = []
    for user in users:
        data.append({
            "id": user[0],
            "usuario": user[1],
            "password": user[2],
            "avatar": user[3]
        })
    return data


def getfromTableId(cursor, id):
    query = "select * from usuario where id = %s"
    params = (id,)
    cursor.execute(query, params)

    user = cursor.fetchone()

    if not cursor.rowcount:
        return {"mensaje": "usuario no encontrado"}

    return {
        "id": user[0],
        "usuario": user[1],
        "password": user[2],
        "avatar": user[3]
    }


# successful method
def insertInTable(cursor, connection, data):
    query = "insert into usuario (usuario , password, avatar) values (%s,%s, %s)"
    params = (data['usuario'], data['password'], data['avatar'])
    cursor.execute(query, params)
    connection.commit()

    query = "select * from usuario where usuario = %s"
    params = (data['usuario'], )
    cursor.execute(query, params)
    user = cursor.fetchone()

    if not cursor.rowcount:
        return {"mensaje": "no se pudo guardar usuario"}

    return {
        "id": user[0],
        "usuario": user[1],
        "password": user[2],
        "avatar": user[3]
    }


# successful update
def updateTable(cursor, connection, data):

    if "avatar" not in data:
        query = "update usuario set password = %s where id=%s"
        params = (data['password'], data['id'])
        cursor.execute(query, params)
        connection.commit()
    else:

        query = "update usuario set password = %s, avatar=%s where id=%s"
        params = (data['password'], data['avatar'], data['id'])
        cursor.execute(query, params)
        connection.commit()
    return None


# successful delete
def deleteinTable(cursor, connection, id):
    query = "delete from usuario where id=%s"
    params = (id, )
    cursor.execute(query, params)
    connection.commit()
    return None
