# Generated by Django 3.2.9 on 2024-03-10 03:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_rename_accout_id_customerrequest_account_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='account',
            name='open_date',
        ),
    ]