# Generated by Django 4.2.1 on 2023-05-28 00:11

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Gw_Person',
            fields=[
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('person_id', models.IntegerField(primary_key=True, serialize=False)),
                ('id_type', models.SmallIntegerField(choices=[(1, 'National_id'), (2, 'International_id')])),
                ('names', models.CharField(max_length=100)),
                ('last_names', models.CharField(max_length=100)),
                ('living_address', models.CharField(max_length=100)),
                ('birth_date', models.DateField(null=True)),
                ('phone1', models.IntegerField(null=True)),
                ('phone2', models.IntegerField(null=True)),
                ('email', models.EmailField(max_length=254, null=True)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_superuser', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Gw_Brand',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('country', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Gw_Client',
            fields=[
                ('client_id', models.AutoField(primary_key=True, serialize=False)),
                ('person_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='person', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Gw_Concessionaire',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='Gw_Headquarter',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('city', models.CharField(max_length=50)),
                ('address', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Gw_Negotation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_modification_date', models.DateField()),
                ('final_sale_price', models.FloatField()),
                ('pay_method', models.SmallIntegerField(choices=[(1, 'cash'), (2, 'credit_cart')], default=1)),
                ('description', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Gw_Service',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('client_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='green_wheels_app.gw_client')),
            ],
        ),
        migrations.CreateModel(
            name='Gw_Service_Diagnosis_Vehicle',
            fields=[
                ('gw_service_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='green_wheels_app.gw_service')),
                ('description', models.CharField(max_length=200)),
                ('date', models.CharField(max_length=30)),
                ('price', models.FloatField(null=True)),
                ('mechanic_id', models.IntegerField(null=True)),
                ('mechanic_name', models.CharField(default='', max_length=40)),
            ],
            bases=('green_wheels_app.gw_service',),
        ),
        migrations.CreateModel(
            name='Gw_Workshop',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('workshop_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='green_wheels_app.gw_headquarter')),
            ],
        ),
        migrations.CreateModel(
            name='Gw_Vehicle_Model',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('year', models.IntegerField()),
                ('brand', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='green_wheels_app.gw_brand')),
            ],
        ),
        migrations.CreateModel(
            name='Gw_Vehicle_Inventory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField()),
                ('concessionaire_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='green_wheels_app.gw_concessionaire')),
                ('model_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='green_wheels_app.gw_vehicle_model')),
            ],
        ),
        migrations.CreateModel(
            name='Gw_Vehicle',
            fields=[
                ('plate', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('made_year', models.IntegerField()),
                ('base_price', models.FloatField()),
                ('guarantee_end_date', models.DateField()),
                ('selled', models.BooleanField(default=False)),
                ('model_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='green_wheels_app.gw_vehicle_model')),
            ],
        ),
        migrations.AddField(
            model_name='gw_service',
            name='vehicle_plate',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='green_wheels_app.gw_vehicle'),
        ),
        migrations.CreateModel(
            name='Gw_Request_Process',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('requested_date', models.DateField()),
                ('attended', models.BooleanField()),
                ('service_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='green_wheels_app.gw_service')),
            ],
        ),
        migrations.CreateModel(
            name='Gw_Replacement_Part',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('description', models.CharField(max_length=100)),
                ('model_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='green_wheels_app.gw_vehicle_model')),
            ],
        ),
        migrations.CreateModel(
            name='Gw_Replacement_Inventory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField()),
                ('replacement_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='green_wheels_app.gw_replacement_part')),
                ('workshop_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='green_wheels_app.gw_workshop')),
            ],
        ),
        migrations.CreateModel(
            name='Gw_Manager',
            fields=[
                ('manager_id', models.AutoField(primary_key=True, serialize=False)),
                ('person_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Gw_Employee',
            fields=[
                ('employee_id', models.AutoField(primary_key=True, serialize=False)),
                ('position', models.SmallIntegerField(choices=[(1, 'Seller'), (2, 'WorkshopBoss')])),
                ('person_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='gw_concessionaire',
            name='headquarter_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='green_wheels_app.gw_headquarter'),
        ),
        migrations.CreateModel(
            name='Gw_Attended_Process',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('attended_date', models.DateField()),
                ('finished_date', models.DateField()),
                ('employee_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='green_wheels_app.gw_employee')),
                ('service_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='green_wheels_app.gw_service')),
            ],
        ),
        migrations.CreateModel(
            name='Gw_Associate_Headquarter',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('headquarter_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='green_wheels_app.gw_headquarter')),
                ('person_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Gw_Admin',
            fields=[
                ('admin_id', models.AutoField(primary_key=True, serialize=False)),
                ('person_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Gw_Service_Sell_Vehicle',
            fields=[
                ('gw_service_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='green_wheels_app.gw_service')),
                ('concessionaire_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='green_wheels_app.gw_concessionaire')),
                ('negotation_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='green_wheels_app.gw_negotation')),
            ],
            bases=('green_wheels_app.gw_service',),
        ),
        migrations.CreateModel(
            name='Gw_Repair_Vehicle',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mechanic_id', models.IntegerField()),
                ('mechanic_name', models.CharField(max_length=100)),
                ('workshop_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='green_wheels_app.gw_workshop')),
                ('diagnosis_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='green_wheels_app.gw_service_diagnosis_vehicle')),
            ],
        ),
        migrations.CreateModel(
            name='Gw_Needed_Replacement_Part',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('approved', models.BooleanField()),
                ('replacement_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='green_wheels_app.gw_replacement_part')),
                ('diagnosis_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='green_wheels_app.gw_service_diagnosis_vehicle')),
            ],
        ),
    ]
