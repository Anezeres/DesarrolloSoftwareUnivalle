# Generated by Django 4.2.1 on 2023-05-22 22:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('green_wheels_app', '0003_gw_concessionaire_gw_diagnosis_gw_headquarter_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='gw_vehicle',
            name='name',
        ),
    ]