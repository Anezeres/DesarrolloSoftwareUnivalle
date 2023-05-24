# Generated by Django 4.2.1 on 2023-05-24 04:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('green_wheels_app', '0009_delete_mycustomgroup'),
    ]

    operations = [
        migrations.AddField(
            model_name='gw_diagnosis',
            name='mechanic_name',
            field=models.CharField(default='', max_length=40),
        ),
        migrations.AlterField(
            model_name='gw_diagnosis',
            name='date',
            field=models.CharField(max_length=30),
        ),
        migrations.AlterField(
            model_name='gw_diagnosis',
            name='description',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='gw_diagnosis',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='gw_diagnosis',
            name='mechanic_id',
            field=models.IntegerField(max_length=100),
        ),
        migrations.AlterField(
            model_name='gw_diagnosis',
            name='price',
            field=models.CharField(),
        ),
    ]
