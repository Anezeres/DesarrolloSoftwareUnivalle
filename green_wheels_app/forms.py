from django import forms
from green_wheels_app.models import Gw_Person
from django.contrib.auth.hashers import make_password

# @name: PersonForm
# @description: This is the form that is show in the admin panel to create a person.
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class PersonForm(forms.ModelForm):

    class Meta:
        model = Gw_Person;
        fields = '__all__';

    password = forms.CharField(widget=forms.PasswordInput);

    def save(self, commit=True):
        instance = super().save(commit=False);
        instance.password = make_password(self.cleaned_data['password']);
        if commit:
            instance.save();
        return instance;

# Para probar login y registro.

from django.contrib.auth.forms import UserCreationForm

class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        fields = UserCreationForm.Meta.fields + ("email",)

        