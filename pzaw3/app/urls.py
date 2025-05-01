from django.urls import path, include
from .views import simple_api

urlpatterns = [
    path('api/v1/ala/',  simple_api ,name='simple_api')
]