import datetime
from .models import user, task, record
import time

# from .tools.datetimeSupport import TimeTools
# from .tools.DataSpider import DataSpider

def minuteUpdate():

    print("----------------更新今日数据----------------")
    print(datetime.datetime.today().strftime("%Y-%m-%d %H:%M"))

    users = user.objects.all()
    tasks = task.objects.all()
    today = int(time.strftime("%w"))
    print(today)
    print(type(today))
    for u in users:
        print(u)
    for t in tasks:
        if str(today) in t.week:
            print(type(t.week))
            print(t.user_ID)
            new_record = record(user_ID=t.user_ID, task_ID=t.id,task_name = t.name, repeat=t.repeat)
            new_record.save()
            # queryset = user.objects.filter(id=t.user_ID)
            # print(queryset[0].name)
            # create a record
            # find coresponding user
            # save into the database


        #思索一下要做的事情
        #1. 检查今天的日期
        #2。获得星期几
        #3。
    # countryDateDictList = []
    # for country in countries:
    #     # 开始时间为昨天
    #     dictTmp = {country.name: TimeTools.getYesterday()}
    #     countryDateDictList.append(dictTmp)
    # spider = DataSpider()
    # ans = spider.update(countryDateDictList)
    # cnt = 0
    # for key in ans:
    #     countryObject = Country.objects.get(name=key)
    #     for data in ans[key]:
    #         dataObject = countryObject.countrydata_set.get(date=data["date"])
    #
    #         dataObject.confirm_add = data["confirm_add"]
    #         dataObject.confirm = data["confirm"]
    #         dataObject.heal = data["heal"]
    #         dataObject.dead = data["dead"]
    #
    #         dataObject.save()
    #         cnt += 1


    print()