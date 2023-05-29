from django.http import JsonResponse;
from green_wheels_app.permissions import panel_permission;

@panel_permission('test_panel')
def test_panel(request):
    
    data = {'message':'If you are seeing this, \
     it is because you have access to the test_panel panel'};

    return JsonResponse(data, status=200);
    