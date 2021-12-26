from django.http.response import JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
from .models import MyModelUser
import datetime
import json
import jwt
import os

@csrf_exempt
def login(request):
    decode = lambda data: data.decode('utf-8')
    body = json.loads(decode(request.body))
    username = body["username"]
    password = body["password"]
    try:
        MyModelUser.objects.get(
            username=username,
            password=password
        )
    except (KeyError, MyModelUser.DoesNotExist):
        return HttpResponseBadRequest("Invalid credentials")
    else:
        secret_key = os.environ.get("JWT_KEY")
        payload = { 
            "username": username, 
            "iat": datetime.datetime.now(tz=datetime.timezone.utc)
        }
        token = jwt.encode(
            payload=payload,
            key=secret_key,
            algorithm='HS256'
        )
        return JsonResponse({
            "username": username,
            "password": password,  
            "jwt": decode(token)
        })

@csrf_exempt
def register(request):
    decode = lambda data: data.decode('utf-8')
    body = json.loads(decode(request.body))
    username = body["username"]
    password = body["password"]
    try:
        user = MyModelUser.objects.get(username=username)
    except (KeyError, MyModelUser.DoesNotExist):
        user = MyModelUser(
            username=username,
            password=password,
            createdAt=datetime.datetime.now()
        )
        user.save()
        return JsonResponse({
            "username": username,
            "password": password,
            "status": "success"
        })
    else:
        return HttpResponseBadRequest("Username unavailable")
