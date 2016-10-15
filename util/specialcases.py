def getResultsFromSpecialCaseDay(string):
    """
    Possible results:
        "Days": [0,1,2,...,6]
        "Date": "ISO 8601 DateString e.g. 2016-12-25"
        "DaysOfMonth" e.g. {n: "BIWEEKLY" or "LAST" or e.g.[1,4] for first and fourth instances of day n} (can be e.g. {1:[1],2:[2,3]})
        "DaysOfMonthFrequency": {n: [k]} for "k times per month" (day n)
        "DatesOfMonth": [i,j,k...] for ith,jth,kth dates of month

    """
    srMap = {
    "Tuesday/Wednesday/Thursdays": {"Days": [2,3,4]},
    "Tuesday/Wednesday": {"Days": [2,3]},
    "Monday, August 29, 2016": {"Date": "2016-08-29"}, #ISO 8601 Date format
    "Thursday at 8:00pm": {"Day": 4},
    "Mondays, Tuesdays, Wednesdays, or Thursdays": {"Days": [1,2,3,4]},
    "Tuesdays, Wednesdays, Thursdays, Fridays": {"Days": [2,3,4,5]},
    "Monday, Thursday": {"Days": [1,4]},
    "2nd Tuesday of every month": {"DaysOfMonth": {2: [2]}},
    "Every fourth friday": {"DaysOfMonth": {5: [4]}},
    "Thursday (2nd Thursday of each month)": {"DaysOfMonth": {4: [2]}},
    "Tuesdays/Thursdays": {"Days": [2,4]},
    "2nd & 4th Tuesdays": {"DaysOfMonth": {2: [2,4]}},
    "Tuesdays, Bi-weekly": {"DaysOfMonth": {2: "BIWEEKLY"}},
    "Third Thursday each month of the academic year": {"DaysOfMonth": {4: [3]}},
    "04/20/2014": {"Date": "2014-04-20"}, #blaze it
    "Thursday, biweekly": {"DaysOfMonth": {4: "BIWEEKLY"}},
    "First Friday of Month": {"DaysOfMonth": {5: [1]}},
    "First Monday of each month": {"DaysOfMonth": {1: [1]}},
    "One Monday per month.": {"DaysOfMonthFrequency": {1: [1]}},
    "11th of every month": {"DatesOfMonth": [11]},
    "1 Sunday per month": {"DaysOfMonthFrequency": {0: [1]}},
    "First Tuesday each Month": {"DaysOfMonth": {2: [1]}},
    "Sunday, Tuesday, Wednesday": {"Days": [0,2,3]},
    "2nd & 4th Sundays": {"DaysOfMonth": {0: [2,4]}},
    "Monday and Wednesday nights": {"Days": [1,3]},
    "Second and fourth Wednesdays of each month": {"DaysOfMonth": {3: [2,4]}},
    "August 30, 2016": {"Date": "2016-08-30"},
    "Tuesday, Wednesday, Friday": {"Days": [2,3,5]},
    "Monday, Wednesday": {"Days": [1,3]},
    "Friday, Saturday or Sunday": {"Days": [0,5,6]},
    "First Wednesday of the Month": {"DaysOfMonth": {3: [1]}},
    "Every other Monday": {"DaysOfMonth": {1: "BIWEEKLY"}},
    "First and Third Thursday of Every Month": {"DaysOfMonth": {4: [1,3]}},
    "Fridays/Shabbat": {"Days": [5,6]}, #Shabbat = Saturday,
    "Last Monday of the month": {"DaysOfMonth": {1: "LAST"}},
    "1st and 3rd Tuesday of the month": {"DaysOfMonth": {2: [1,3]}},
    "3rd Thursday of each month": {"DaysOfMonth": {4: [3]}},
    "Second Sunday of Every Month": {"DaysOfMonth": {0: [2]}},
    "Tuesday - 8pm | Wednesday 12pm": {"Days": [2,3]},
    "First and Third Sunday's of the Month": {"DaysOfMonth": {0: [1,3]}},
    "September 3, 2014": {"Date": "2014-09-03"},
    "Third Tuesday of the month": {"DaysOfMonth": {2: [3]}},
    "Fridays, and Tuesdays": {"Days": [2,5]},
    "Tuesday's and Thursday's": {"Days": [2,4]},
    "First Friday of every month": {"Days": {5: [1]}},
    "Aug 27": {"Date": "2016-08-07"},
    "2nd Tuesday of every month September - April": {"DaysOfMonth": {2: [2]}},
    "last Saturday of the month": {"DaysOfMonth": {6: "LAST"}},
    "General Meetings - First Tuesday of Each Month": {"DaysOfMonth": {2: [1]}},
    "One Thursday a month": {"DaysOfMonthFrequency": {4: [1]}},
    "Thursday (once-every-two-weeks)": {"DaysOfMonth": {4: "BIWEEKLY"}},
    "Alternating between Wednesdays and Thursdays": {"DaysOfMonth": {3: [1,3], 4: [2,4]}}, #SHHH THERE IS NO 5TH WEEK EVER
    "MW": {"Days": [1,3]},
    "Tuesdays/Wednesdays": {"Days": [2,3]},
    "Monday, Thursday": {"Days": [1,4]},
    "First and Third Mondays of each month": {"DaysOfMonth": {1: [1,3]}},
    "Tuesday(Bi weekly)": {"DaysOfMonth": {2: "BIWEEKLY"}},
    "1st & 3rd Tuesdays of the month": {"DaysOfMonth": {2: [1,3]}},
    "First Friday every month": {"DaysOfMonth": {5: [1]}},
    "2nd and 4th Mondays": {"DaysOfMonth": {1: [2,4]}},
    "First Wednesday of Every Month": {"DaysOfMonth": {3: [1]}},
    "First Monday of each month": {"DaysOfMonth": {1: [1]}},
    "Thursday (non-routine)": {"Days": [4]},
    "1st and 3rd Wednesday of each month (August - May)": {"DaysOfMonth": {3: [1,3]}},
    "Bi-weekly on Thursdays": {"DaysOfMonth": {4: "BIWEEKLY"}},
    "First Tuesday of the month": {"DaysOfMonth": {2: [1]}},
    "Wednesday or Sunday": {"Days": [0,3]},
    "Second Thursday of Every Month": {"DaysOfMonth": {4: [2]}},
    "Sunday, Tuesday, Thursday": {"Days": [0,2,4]},
    "Tuesday/Thursday": {"Days": [2,4]},
    "Monday, Tuesday, Thursday": {"Days": [1,2,4]},
    "1st Tuesday of every month": {"DaysOfMonth": {2: [1]}},
    "Monday, Tuesday, Thursday": {"Days": [1,2,4]},
    "Tuesday, Wednesday, and Thursday": {"Days": [2,3,4]},
    "Routinely the second Wednesday of each month. Special project/event meetings individually announced by email distribution list.": {"DaysOfMonth": {3: [2]}},
    "Sunday, Monday, Wednesday": {"Days": [0,1,3]},
    "Tuesday or Thursday": {"Days": [2,4]},
    "1st & 3rd Tuesday's of Each Month": {"DaysOfMonth": {2: [1,3]}},
    "First Sunday of Every Month": {"DaysOfMonth": {0: [1]}},
    "1st Sunday each month": {"DaysOfMonth": {0: [1]}}
    }
    srMap = {name.strip().upper() : val for name,val in srMap.items()}
    return srMap[string]

def getResultsFromSpecialCaseTime(string):
    pass
