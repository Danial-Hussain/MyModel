from django.urls import path

from . import views

urlpatterns = [
    path('<str:username>/get-models/', views.getModels, name="getModels"),
    path('<str:username>/build-model/', views.buildModel, name='buildModel'),
    path('<str:username>/save-model/', views.saveModel, name='saveModel')
]