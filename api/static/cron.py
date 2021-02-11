from crontab import CronTab
cron = CronTab(user='root')
job = cron.new(command='python 1.py')
job.minute.every(1)
cron.write()