from curses.ascii import HT
from urllib import response
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import FileResponse, HttpResponse
from .models import StreamFile
from . import util

import mimetypes
import os
import json

def assignType(dir):
    mType =  mimetypes.guess_type(dir)[0]
    obj = {
        'dir_name': dir,
        'dir_type': mType
    }
    return obj


@api_view(['POST'])
def getDirs(request):
    dirPath = request.data['dirPath']
    dirs = {}
    
    if dirPath == None:
        dirPath = os.path.expanduser('~')
    dList = list(os.listdir(dirPath))
    dList.sort()
    dList = list(map(assignType, dList))

    dirs['result'] = dList
    dirs['current_path'] = dirPath
    return Response(dirs)

@api_view(['GET'])
def getFile(request, unique_id):
    st = StreamFile.objects.get(token=unique_id)
    filePath = st.filepath
    if filePath:
        response = FileResponse(open(os.path.join(filePath), 'rb'))
        response['Content-Disposition'] = 'attachment'
    else:
        response = Response({'result': 'token not exist'})

    st.delete()
    return response

@api_view(['POST'])
def getToken(request):
    filePath = request.data['filePath']
    new_tk = util.generateToken()
    st = StreamFile(token=new_tk, filepath=filePath)
    print(st)
    st.save()

    return Response({'token': new_tk})

@api_view(['GET'])
def deleteToken(request, unique_id):
    StreamFile.objects.get(token=unique_id).delete()
    return Response({'result': 'Stream Token Deleted'})

@api_view(['POST'])
def downloadFile(request):
    filePath = request.data['filePath']
    filename = os.path.basename(filePath)

    f = open(filePath, 'rb')
    response = HttpResponse(f.read(), content_type="video/mp4")
    response['Content-Length'] = os.path.getsize(filePath)
    response['Content-Disposition'] = \
        "attachment; filename=\"%s\"; filename*=utf-8''%s" % \
        (filename, filename)
    f.close()
    return response