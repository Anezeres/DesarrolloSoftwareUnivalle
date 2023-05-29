from green_wheels_app.panel_views import *
from django.urls import path;

urlpatterns = [
    path('test_panel', test_panel, name = 'test_panel'),
];

