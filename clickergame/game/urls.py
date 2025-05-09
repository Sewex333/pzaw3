from django.urls import path
from . import views

urlpatterns = [
    path('click/', views.click, name='click'),
    path('player/', views.PlayerDetail.as_view(), name='player-detail'),
]