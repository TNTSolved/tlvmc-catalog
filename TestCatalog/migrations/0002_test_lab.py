# Generated by Django 3.2.7 on 2021-09-23 15:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('TestCatalog', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='test',
            name='lab',
            field=models.ForeignKey(blank=True, db_column='Lab_ID', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='TestCatalog.lab'),
        ),
    ]