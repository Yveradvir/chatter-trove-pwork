# Generated by Django 5.1 on 2024-09-10 16:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_user_groups_user_is_active_user_is_staff_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='useradditionals',
            name='password_for_pfp_changing',
            field=models.BooleanField(default=True),
        ),
    ]
