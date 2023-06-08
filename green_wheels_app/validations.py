from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
UserModel = get_user_model()

def custom_validation(data):
    person_id = data['person_id'].strip()
    password = data['password'].strip()
    ##
    if not person_id or UserModel.objects.filter(person_id=person_id).exists():
        raise ValidationError('choose another id')
    ##
    if not password or len(password) < 8:
        raise ValidationError('choose another password, min 8 characters')
    ##
    if not person_id:
        raise ValidationError('choose another id')
    return data


def validate_email(data):
    email = data['email'].strip()
    if not email:
        raise ValidationError('an email is needed')
    return True

def validate_id(data):
    person_id = data['person_id'].strip()
    if not person_id:
        raise ValidationError('an id is needed')
    return True

def validate_password(data):
    password = data['password'].strip()
    if not password:
        raise ValidationError('a password is needed')
    return True