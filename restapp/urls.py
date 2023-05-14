from rest_framework import routers
from django.urls import path, include
from restapp import views

# @name: router
# @description: Router for the Car model api
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

router = routers.DefaultRouter();
router.register(r'cars', views.CarViewSet);

urlpatterns = [
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]