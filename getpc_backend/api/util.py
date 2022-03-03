import mimetypes
import string
import random

def assignType(dir):
    mType =  mimetypes.guess_type(dir)[0]
    obj = {
        'dir_name': dir,
        'dir_type': mType
    }
    return obj


def generateToken():
    res = ''.join(random.choices(string.ascii_lowercase +
                             string.digits, k = 5))

    return str(res)