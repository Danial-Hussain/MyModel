# Generated by Django 4.0 on 2021-12-24 11:22

import algo.models
from django.db import migrations, models
import djongo.models.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='MachineLearningModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=255)),
                ('model_name', models.CharField(max_length=255)),
                ('folder_name', models.CharField(max_length=255)),
                ('created_at', models.DateField(auto_now_add=True)),
                ('predictors', djongo.models.fields.ArrayField(model_container=algo.models.Feature)),
                ('response', djongo.models.fields.EmbeddedField(model_container=algo.models.Feature)),
                ('metrics', djongo.models.fields.ArrayField(model_container=algo.models.Metric)),
            ],
        ),
    ]
