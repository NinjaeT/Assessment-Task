# Generated by Django 4.2.7 on 2024-09-20 09:45

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('image', models.ImageField(upload_to='images/')),
                ('image_description', models.CharField(blank=True, max_length=255, null=True)),
            ],
        ),
    ]
