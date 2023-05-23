from rest_framework.permissions import BasePermission


# @name: IsClient
# @description: Check if a given user belongs to the Clients group
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com


# class IsClient(BasePermission):
#     def has_permission(self, request, view):
#         return request.user.groups.filter(name='Clients').exists();