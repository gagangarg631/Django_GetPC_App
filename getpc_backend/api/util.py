import string
import random

def generateToken():
    res = ''.join(random.choices(string.ascii_lowercase +
                             string.digits, k = 5))

    return str(res)