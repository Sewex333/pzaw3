from rest_framework import generics, status
from rest_framework.response import Response
from .models import Player
from .serializers import PlayerSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from django.utils import timezone

@api_view(['POST'])
@permission_classes([IsAuthenticated]) 
def click(request):
    player = Player.objects.get(user=request.user)
    player.score += player.click_power
    player.last_click = timezone.now()
    player.save()
    return Response({'score': player.score})

class PlayerDetail(generics.RetrieveAPIView):
    serializer_class = PlayerSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return Player.objects.get(user=self.request.user)