import datetime
from .models import task, record
import time
from django.contrib.auth.models import User
# from .tools.datetimeSupport import TimeTools
# from .tools.DataSpider import DataSpider

def recordUpdate():
    tasks = task.objects.all()

    now = datetime.datetime.now()
    today_date  = now.strftime("%Y-%m-%d")
    print(today_date)

    today_week = int(time.strftime("%w"))
    print(today_week)

    for t in tasks:
        if str(today_week) in t.week:
            queryset = record.objects.filter(user_ID=t.user_ID, task_ID=t.id,task_name = t.name, date = today_date )
            if not queryset.exists():
                new_record = record(user_ID=t.user_ID, task_ID=t.id,task_name = t.name, repeat=t.repeat)
                new_record.save()