from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

import os
import json


@api_view(['POST'])
def getDirs(request):
    dirPath = request.data['dirPath']
    dirs = {}
    print(dirPath)
    if dirPath == None:
        c_user = os.path.expanduser('~')
        dirs['result'] = os.listdir(c_user)
        dirs['current_path'] = c_user
    else:
        dirs['result'] = os.listdir(dirPath)
        dirs['current_path'] = dirPath

    return Response(dirs)
