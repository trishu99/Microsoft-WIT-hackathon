# not able to find dataset and pretrained ml model so for time being used hard coded
# and simple kind of rule based engine is crated
import re

rules = {
    "project": ['am', 10, 5],
    "work": ['am', 10, 5],
    "market": ['pm', 7, 8],
    "shopping": ['pm', 7,8],
    "sleep": ['pm', 11, 7],
    "exercise": ['am', 7, 8],
    "lunch": ['pm', 1, 2],
    "dinner": ['pm', 8, 9],
    "familytime": ['pm', 7, 8],
    "enjoy": ['pm', 9, 11],
    "learn": ['pm', 6, 7]
}

office_schedule = {
    "meetings": [['am', 10, 11], ['pm', 2, 3]],
    "lunch": ['pm',1, 2]
}

'''todos = [
    "react project",
    "shopping",
    "learn java",
    ]'''


time = {
    '12am':True,
    '1am':True,
    '2am':True,
    '3am':True,
    '4am':True,
    '5am':True,
    '6am':True,
    '7am':False,
    '8am':False,
    '9am':False,
    '10am':False,
    '11am':False,
    '12pm':False,
    '1pm':False,
    '2pm':False,
    '3pm':False,
    '4pm':False,
    '5pm':False,
    '6pm':False,
    '7pm':False,
    '8pm':False,
    '9pm':False,
    '10pm':False,
    '11pm':True,
}

def find_match(todo):
    for key in rules:
        if key in todo:
            return key
    
def find_slot_office(key):
    return [['am', 11, 1], ['pm', 3, 5]]



def mark_slot_True(slot):
    time[slot] = True

def mark_slot_False(slot):
    time[slot] = False


def createtimetable(todolist):
    print(todolist)
    todos = []
    for todo in todolist:
        todos.append(todo['title'].lower())
    print(todos)
    timetable = []
    timetable.append(
        {'id': 1, 'time':"7am", 'task': "Exercise & Meditation"}
    )
    timetable.append(
        {'id': 2,'time':"9am", 'task': "Go to Office"}
    )

    i = 3
    for key in office_schedule:
        if key == 'meetings':
            m = office_schedule[key]
            for meet in m:
                val = str(meet[1]) + meet[0]
                timetable.append(
                    {'id': i,'time':val, 'task': key}
                )
                i += 1
                mark_slot_True(val)
            
        else:
            t = office_schedule[key]
            val = str(t[1]) + t[0]
            timetable.append(
                    {'id': i,'time':val, 'task': key}
            )
            i += 1
            mark_slot_True(val)
    for todo in todos:
        matching_key = find_match(todo)
        if matching_key == 'project' or matching_key == 'work':
            slot = find_slot_office(matching_key)
            for t in slot:
                s = str(t[1]) + t[0] + " to " + str(t[2]) + "pm"
                timetable.append(
                    {'id': i,'time':s, 'task': todo}
                )
                i += 1
            
        else:
            t = rules[matching_key]
            s = str(t[1]) + t[0] + " to " + str(t[2]) + t[0]
            timetable.append(
                    {'id': i,'time':s, 'task': todo}
                )
            i += 1

    timetable.append(
        {'id': i, 'time':"11pm to 7am", 'task': "sleep"}
    )
    i += 1
    timetable.append(
        {'id': i, 'time':"8pm to 10pm", 'task': "family time & dinner"}
    )
    i += 1

    timetable.append(
        {'id': i, 'time':"10pm to 11pm", 'task': "Do whatever you want :)"}
    )
    i += 1




    return timetable



