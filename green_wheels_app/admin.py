from django.contrib import admin
from green_wheels_app.models import *
from green_wheels_app.forms import PersonForm

admin.site.register(Gw_Manager);
admin.site.register(Gw_Client);
admin.site.register(Gw_Employee);
admin.site.register(Gw_Admin);
admin.site.register(Gw_Service_Diagnosis_Vehicle);

class Gw_UserAdmin(admin.ModelAdmin):
    form = PersonForm;

admin.site.register(Gw_Person, Gw_UserAdmin);
admin.site.register(Gw_Brand);
admin.site.register(Gw_Vehicle_Model);
admin.site.register(Gw_Vehicle);

admin.site.register(Gw_Panel);
admin.site.register(Gw_Allowed_Panels);
admin.site.register(Gw_Headquarter);
admin.site.register(Gw_Concessionaire);
admin.site.register(Gw_Associate_Headquarter)


admin.site.register(Gw_Service);
admin.site.register(Gw_Service_Sell_Vehicle);
admin.site.register(Gw_Request_Process);
admin.site.register(Gw_Attended_Process);
admin.site.register(Gw_Negotation);



# class Gw_Headquater(admin.ModelAdmin):
#     form = Gw_HeadquaterForm;

