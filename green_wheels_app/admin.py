from django.contrib import admin
from green_wheels_app.models import *
from green_wheels_app.forms import PersonForm

admin.site.register(Gw_Manager);
admin.site.register(Gw_Client);
admin.site.register(Gw_Employee);
admin.site.register(Gw_Admin);
admin.site.register(Gw_Diagnosis);

class Gw_UserAdmin(admin.ModelAdmin):
    form = PersonForm;

admin.site.register(Gw_Person, Gw_UserAdmin);
admin.site.register(Gw_Brand);
admin.site.register(Gw_Vehicle_Model);
admin.site.register(Gw_Vehicle);
#admin.site.register(MyCustomGroup);
