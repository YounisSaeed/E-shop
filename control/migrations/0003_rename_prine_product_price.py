# Generated by Django 3.2 on 2022-03-29 14:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('control', '0002_product_image'),
    ]

    operations = [
        migrations.RenameField(
            model_name='product',
            old_name='prine',
            new_name='price',
        ),
    ]