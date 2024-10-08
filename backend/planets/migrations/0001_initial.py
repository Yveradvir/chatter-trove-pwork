# Generated by Django 5.1 on 2024-09-21 16:56

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Planet',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('planetname', models.CharField(max_length=40, unique=True)),
                ('nickname', models.CharField(max_length=80)),
                ('password', models.CharField(blank=True, max_length=40, null=True)),
            ],
        ),
    ]
