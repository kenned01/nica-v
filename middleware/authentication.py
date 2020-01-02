from functools import wraps
from flask import request
from response.response import noneAuth


def authenticate(func):
    @wraps(func)
    def wrapper(*args, **kwargs):

        if 'Auth' in request.headers:
            if request.headers.get("Auth") != "nv/@pi~kronno":
                return noneAuth()
            
            return func(*args, **kwargs)
        else:
            return noneAuth()

    return wrapper
