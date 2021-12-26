from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('api/', include('algo.urls')),
    path('auth/', include('authentication.urls')),
    path('admin/', admin.site.urls)
]
