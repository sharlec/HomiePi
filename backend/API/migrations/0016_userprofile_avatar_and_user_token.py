from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0015_add_task_token_and_task_unique'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='avatar',
            field=models.CharField(default='sunset', max_length=32),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='gender',
            field=models.CharField(default='M', max_length=2, choices=[('M', 'Male'), ('F', 'Female')]),
        ),
        migrations.CreateModel(
            name='AddUserToken',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('token', models.CharField(max_length=64, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('expires_at', models.DateTimeField()),
                ('used', models.BooleanField(default=False)),
                ('used_at', models.DateTimeField(blank=True, null=True)),
            ],
        ),
    ]

