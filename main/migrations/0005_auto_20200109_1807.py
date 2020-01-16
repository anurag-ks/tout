# Generated by Django 3.0.2 on 2020-01-09 18:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_auto_20200109_1507'),
    ]

    operations = [
        migrations.RenameField(
            model_name='menuitem',
            old_name='type',
            new_name='food_type',
        ),
        migrations.RemoveField(
            model_name='menu',
            name='item',
        ),
        migrations.AddField(
            model_name='menuitem',
            name='item_type',
            field=models.CharField(choices=[('starters', 'Starters'), ('main_course', 'Main Course'), ('drinks', 'Drinks')], default='starters', max_length=20),
        ),
        migrations.AddField(
            model_name='menuitem',
            name='menu',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='main.Menu'),
        ),
        migrations.CreateModel(
            name='Packages',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('package_name', models.CharField(max_length=30, null=True)),
                ('details', models.CharField(max_length=200, null=True)),
                ('veg_starters_count', models.PositiveSmallIntegerField()),
                ('non_veg_starters_count', models.PositiveSmallIntegerField()),
                ('veg_main_course', models.PositiveSmallIntegerField()),
                ('non_veg_main_course', models.PositiveSmallIntegerField()),
                ('drinks_count', models.PositiveSmallIntegerField()),
                ('restaurant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.Restaurant')),
            ],
        ),
    ]
