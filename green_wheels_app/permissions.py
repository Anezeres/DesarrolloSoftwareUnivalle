from rest_framework.permissions import BasePermission
from green_wheels_app.auth_views import *
from green_wheels_app.models import Gw_Person, Gw_Allowed_Panels;
from functools import wraps

# @name: panel_permission
# @description: Decorator that restricts panel components to allow its access only to
# those who have access to the given panel name.
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

def panel_permission(panel_name):
    def decorator(view_func):
        @wraps(view_func)
        def wrapper(request, *args, **kwargs):
            permission = HavePanelAccess(panel_name=panel_name)
            if not permission.has_permission(request, view_func):
                return HttpResponse('Permission denied', status=403)
            return view_func(request, *args, **kwargs)
        return wrapper
    return decorator


# @name: HavePanelAccess
# @description: This class decides if a user has access to a given panel
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class HavePanelAccess(permissions.BasePermission):
    def __init__(self, panel_name):
        self.panel_name = panel_name;

    def has_permission(self, request, view):
        try:
            person_id = UserView().get(request).data['user']['person_id'];
            
            person = Gw_Person.objects.get(person_id=person_id);

            groups = person.groups.values();

            groups_list = [];

            for g in groups:
                groups_list.append(g['id']);
            
            allowed_panels = Gw_Allowed_Panels.objects.filter(group_id__in=groups_list).values('panel_id__panel_name');

            allowed_panels_list = [];

            for panel in allowed_panels:
                allowed_panels_list.append(panel['panel_id__panel_name']);

            if (self.panel_name in allowed_panels_list):
                return True;
            else:
                return False;
        except Exception as e:
            print(e);
            return False;
