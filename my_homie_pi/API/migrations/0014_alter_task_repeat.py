from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0013_auto_20210818_0225'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='repeat',
            field=models.IntegerField(default=1),
        ),
    ]

