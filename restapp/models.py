from django.db import models


# @name: Car
# @description: Model example to test rest api
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class Car(models.Model):
    plate = models.CharField(max_length=6);
    model_name = models.CharField(max_length=20);
    price = models.DecimalField(max_digits=10, decimal_places=3);
