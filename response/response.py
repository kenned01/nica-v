def responseok(data):
    return data, 200


def responsefail():
    return {'mensaje': 'no se pudo hacer la transaccion'}, 500


def respponse404():
    return {"mensaje": "objeto no encontrado"}, 404


def noneAuth():
    return {"mensaje": "no tiene autorización"}, 401


def mensajeError(mensaje):
    return {"mensaje": mensaje}, 500


def mensajeOk(mensaje):
    return {"mensaje": mensaje}, 200
