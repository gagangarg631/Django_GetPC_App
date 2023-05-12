from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import StreamingHttpResponse, HttpResponse
from .models import StreamFile
from . import util

from sys import platform
import mimetypes
import zipfile
from io import BytesIO

import os
import re
import psutil


@api_view(['POST'])
def downloadDirectory(request):
    dirPath = request.data['dirPath']

    zipFileName = os.path.basename(dirPath)

    # open a new byte stream in memory
    file_in_memory = BytesIO()

    zf = zipfile.ZipFile(file_in_memory, "w")

    rootlen = len(dirPath) + 1
    for base, dirs, files in os.walk(dirPath):
        for file in files:
            fn = os.path.join(base, file)
            zf.write(fn, fn[rootlen:])
    zf.close()

    response = HttpResponse(content_type="application/zip")
    response['Content-Disposition'] = 'attachment; filename=%s' % zipFileName

    file_in_memory.seek(0)
    response.write(file_in_memory.read())

    return response


@api_view(['POST'])
def getDirs(request):
    dirPath = request.data['dirPath']
    dirs = {}
    dList = []
    print(dirPath)
    if dirPath == None:
        if platform == 'linux':
            dirPath = '/'
        elif platform == 'win32':
            user = psutil.users()[0].name
            dirPath = f'D:\\'
        else:
            print("Operating System neither linux nor windows")

    if dirPath == '/':
        dList = ['home', 'media']
    else:
        dList = list(os.listdir(dirPath))
    
    dList.sort()
    # replace all dir names in list with dict contains 'dir' and 'type' properties
    dList = list(map(util.assignType, dList))

    dirs['result'] = dList
    dirs['current_path'] = dirPath
    return Response(dirs)


# get remaining bytes of a file
def get_bytes(file_name, chunk_size=8192, offset=0, length=None):
    with open(file_name, "rb") as f:
        f.seek(offset, os.SEEK_SET)
        remaining = length
        while True:
            bytes_length = chunk_size if remaining is None else min(
                remaining, chunk_size)
            data = f.read(bytes_length)
            if not data:
                break
            if remaining:
                remaining -= len(data)
            yield data


# get audio/video to preview in browser
# tokens generated still exist in database even after closing the file - need to fix
def getFile(request, unique_id):
    st = StreamFile.objects.get(token=unique_id)
    path = st.filepath

    """Responding to the video file by streaming media"""
    range_header = request.META.get('HTTP_RANGE', '').strip()
    range_re = re.compile(r'bytes\s*=\s*(\d+)\s*-\s*(\d*)', re.I)
    range_match = range_re.match(range_header)

    size = os.path.getsize(path)
    content_type, encoding = mimetypes.guess_type(path)
    content_type = content_type or 'application/octet-stream'

    if range_match:
        first_byte, last_byte = range_match.groups()
        first_byte = int(first_byte) if first_byte else 0
        
        # 8M Each piece, the maximum volume of the response body
        last_byte = first_byte + 1024 * 1024 * 8
        
        if last_byte >= size:
            last_byte = size - 1
        length = last_byte - first_byte + 1
        resp = StreamingHttpResponse(get_bytes(
            path, offset=first_byte, length=length), status=206, content_type=content_type)
        resp['Content-Length'] = str(length)
        resp['Content-Range'] = 'bytes %s-%s/%s' % (
            first_byte, last_byte, size)
    else:
        # request comes directly from browser instead of video tag (only video tag sends http range)
        return HttpResponse("<strong>You are not authorized to access this file</strong>")

    resp['Accept-Ranges'] = 'bytes'
    return resp


@api_view(['POST'])
def getToken(request):
    filePath = request.data['filePath']
    new_tk = util.generateToken()
    st = StreamFile(token=new_tk, filepath=filePath)
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
