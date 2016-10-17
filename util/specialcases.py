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

def getResultsFromSpecialCaseTime(uncapitalizedString):
    srMap = {
        "Tue 7pm-9pm / Wed 7pm-9pm / Thu 6pm-8pm": {
            "ResultsByDay": {
                2: {
                    "IntervalStarts": {"Hours": 19, "Minutes": 0},
                    "IntervalEnds": {"Hours": 21, "Minutes": 0}
                },
                3: {
                    "IntervalStarts": {"Hours": 19, "Minutes": 0},
                    "IntervalEnds": {"Hours": 21, "Minutes": 0}
                },
                4: {
                    "IntervalStarts": {"Hours": 18, "Minutes": 0},
                    "IntervalEnds": {"Hours": 20, "Minutes": 0}
                }
            }
        },
        "7:00pm-8:45pm": {"IntervalStarts": {"Hours": 19, "Minutes": 0}, "IntervalEnds": {"Hours": 20, "Minutes": 45}},
        "5:00am": {"Starts": {"Hours": 5, "Minutes": 0}},
        "4-6 PM": {"IntervalStarts": {"Hours": 16, "Minutes": 0}, "IntervalEnds": {"Hours": 18, "Minutes": 0}},
        "6:45 p.m.": {"Starts": {"Hours": 18, "Minutes": 45}},
        "6-8 PM": {"IntervalStarts": {"Hours": 18, "Minutes": 0}, "IntervalEnds": {"Hours": 20, "Minutes": 0}},
        "Evening": {"Varies": True},
        "2:45-5pm": {"IntervalStarts": {"Hours": 14, "Minutes": 45}, "IntervalEnds": {"Hours": 17, "Minutes": 0}},
        "3:30-5:30": {"IntervalStarts": {"Hours": 15, "Minutes": 30}, "IntervalEnds": {"Hours": 17, "Minutes": 30}},
        "3-6 pm": {"IntervalStarts": {"Hours": 15, "Minutes": 0}, "IntervalEnds": {"Hours": 18, "Minutes": 0}},
        "1800": {"Starts": {"Hours": 18, "Minutes": 0}},
        "18:30": {"Starts": {"Hours": 18, "Minutes": 30}},
        "7-8 PM": {"IntervalStarts": {"Hours": 19, "Minutes": 0}, "IntervalEnds": {"Hours": 20, "Minutes": 0}},
        "5:00 - 7:00 P.M.": {"IntervalStarts": {"Hours": 17, "Minutes": 0}, "IntervalEnds": {"Hours": 19, "Minutes": 0}},
        "5:15": {"Starts": {"Hours": 17, "Minutes": 15}},
        "6:00 - 7:00 PM (Manga) ; 7:00 PM - 10:00 PM (Anime)": {"IntervalStarts": {"Hours": 18, "Minutes": 0}, "IntervalEnds": {"Hours": 22, "Minutes": 0}},
        "Tues: 5:15 pm Thurs: 7:00 pm": {"ResultsByDay": {
            2: {"Starts": {"Hours": 17, "Minutes": 15}},
            4: {"Starts": {"Hours": 19, "Minutes": 0}}
        }},
        "6:00 P.M. - 8:00 P.M.": {"IntervalStarts": {"Hours": 18, "Minutes": 0}, "IntervalEnds": {"Hours": 20, "Minutes": 0}},
        "4-5p": {"IntervalStarts": {"Hours": 16, "Minutes": 0}, "IntervalEnds": {"Hours": 17, "Minutes": 0}},
        "3-5": {"IntervalStarts": {"Hours": 15, "Minutes": 0}, "IntervalEnds": {"Hours": 17, "Minutes": 0}},
        "5:00 pm - 6:00 pm": {"IntervalStarts": {"Hours": 17, "Minutes": 0}, "IntervalEnds": {"Hours": 18, "Minutes": 0}},
        "5:45": {"Starts": {"Hours": 17, "Minutes": 45}},
        "7-8pm": {"IntervalStarts": {"Hours": 19, "Minutes": 0}, "IntervalEnds": {"Hours": 20, "Minutes": 0}},
        "Evening": {"Varies": True},
        "7-8": {"IntervalStarts": {"Hours": 19, "Minutes": 0}, "IntervalEnds": {"Hours": 20, "Minutes": 0}},
        "8 and 9 PM": {"Starts": {"Hours": 20, "Minutes": 0}}, #Let's pretend we can't have multiple starting times for now
        "12:00 - 1:00 pm": {"IntervalStarts": {"Hours": 12, "Minutes": 0}, "IntervalEnds": {"Hours": 13, "Minutes": 0}},
        "2:00-4:30": {"IntervalStarts": {"Hours": 14, "Minutes": 0}, "IntervalEnds": {"Hours": 16, "Minutes": 30}},
        "3:15": {"Starts": {"Hours": 15, "Minutes": 15}},
        "5:00 p.m. - 6:00 p.m.": {"IntervalStarts": {"Hours": 17, "Minutes": 0}, "IntervalEnds": {"Hours": 18, "Minutes": 0}},
        "12:15 PM": {"Starts": {"Hours": 12, "Minutes": 15}},
        "6:00 - 10:00": {"IntervalStarts": {"Hours": 18, "Minutes": 0}, "IntervalEnds": {"Hours": 22, "Minutes": 0}},
        "6:00 PM - 8:00 PM": {"IntervalStarts": {"Hours": 18, "Minutes": 0}, "IntervalEnds": {"Hours": 20, "Minutes": 0}},
        "6-10pm Saturdays; 3-5pm Sundays": {"ResultsByDay": {
            0: {"IntervalStarts": {"Hours": 15, "Minutes": 0}, "IntervalEnds": {"Hours": 17, "Minutes": 0}},
            6: {"IntervalStarts": {"Hours": 18, "Minutes": 0}, "IntervalEnds": {"Hours": 22, "Minutes": 0}}
        }},
        "7:00 P.M. CST": {"Starts": {"Hours": 19, "Minutes": 0}},
        "6:30-8:00": {"IntervalStarts": {"Hours": 18, "Minutes": 30}, "IntervalEnds": {"Hours": 20, "Minutes": 0}},
        "5:15pm": {"Starts": {"Hours": 17, "Minutes": 15}},
        "8am-5pm": {"IntervalStarts": {"Hours": 8, "Minutes": 0}, "IntervalEnds": {"Hours": 17, "Minutes": 0}},
        "September 13, 2016, 6:30 PM | October 2016, 6:30 PM | November 15, 2016, 6:30 PM": {"Starts": {"Hours": 18, "Minutes": 30}},
        "3:30 PM - 4:30 PM": {"IntervalStarts": {"Hours": 15, "Minutes": 30}, "IntervalEnds": {"Hours": 16, "Minutes": 30}},
        "8am-10pm": {"IntervalStarts": {"Hours": 8, "Minutes": 0}, "IntervalEnds": {"Hours": 22, "Minutes": 0}},
        "8:00am-5:00pm": {"IntervalStarts": {"Hours": 8, "Minutes": 0}, "IntervalEnds": {"Hours": 17, "Minutes": 0}},
        "6:00pm-7:00pm": {"IntervalStarts": {"Hours": 18, "Minutes": 0}, "IntervalEnds": {"Hours": 19, "Minutes": 0}},
        "7:45pm-9:00pm": {"IntervalStarts": {"Hours": 19, "Minutes": 45}, "IntervalEnds": {"Hours": 21, "Minutes": 0}},
        "7-8": {"IntervalStarts": {"Hours": 19, "Minutes": 0}, "IntervalEnds": {"Hours": 20, "Minutes": 0}},
        "6:15pm": {"Starts": {"Hours": 18, "Minutes": 15}},
        "3-6pm": {"IntervalStarts": {"Hours": 15, "Minutes": 0}, "IntervalEnds": {"Hours": 18, "Minutes": 0}},
        "03.00pm -04.00pm": {"IntervalStarts": {"Hours": 15, "Minutes": 0}, "IntervalEnds": {"Hours": 16, "Minutes": 0}},
        "8pm & 12pm": {"Starts": {"Hours": 20, "Minutes": 0}}, #again, let's play pretend...if the reqs change or we change our minds, TODO: fix this
        "6:45pm": {"Starts": {"Hours": 18, "Minutes": 45}},
        "6:30 to 8:00": {"IntervalStarts": {"Hours": 18, "Minutes": 30}, "IntervalEnds": {"Hours": 20, "Minutes": 0}},
        "Friday - 3:00pm; Tuesdays 6:30": {"ResultsByDay": {
            2: {"Starts": {"Hours": 18, "Minutes": 30}},
            5: {"Starts": {"Hours": 15, "Minutes": 0}}
        }},
        "8 PM on Tuesday, 6 PM on Thursday": {"ResultsByDay": {
            2: {"Starts": {"Hours": 20, "Minutes": 0}},
            5: {"Starts": {"Hours": 18, "Minutes": 0}}
        }},
        "5:30 - 6:30 PM": {"IntervalStarts": {"Hours": 17, "Minutes": 30}, "IntervalEnds": {"Hours": 18, "Minutes": 30}},
        "5:15": {"Starts": {"Hours": 17, "Minutes": 15}},
        "6-7 PM": {"IntervalStarts": {"Hours": 18, "Minutes": 0}, "IntervalEnds": {"Hours": 19, "Minutes": 0}},
        "8-9 p.m.": {"IntervalStarts": {"Hours": 20, "Minutes": 0}, "IntervalEnds": {"Hours": 21, "Minutes": 0}},
        "1-3 and by appointment": {"IntervalStarts": {"Hours": 13, "Minutes": 0}, "IntervalEnds": {"Hours": 15, "Minutes": 0}},
        "4-5 pm": {"IntervalStarts": {"Hours": 16, "Minutes": 0}, "IntervalEnds": {"Hours": 17, "Minutes": 0}},
        "9:15": {"Starts": {"Hours": 21, "Minutes": 15}},
        "6:30-7:30pm": {"IntervalStarts": {"Hours": 18, "Minutes": 30}, "IntervalEnds": {"Hours": 19, "Minutes": 30}},
        "12-1pm": {"IntervalStarts": {"Hours": 12, "Minutes": 0}, "IntervalEnds": {"Hours": 13, "Minutes": 0}},
        "5:30 p.m. to 7:00 p.m.": {"IntervalStarts": {"Hours": 17, "Minutes": 30}, "IntervalEnds": {"Hours": 19, "Minutes": 0}},
        "6:15 p.m.": {"Starts": {"Hours": 18, "Minutes": 15}},
        "3:30-4:45 p.m.": {"IntervalStarts": {"Hours": 15, "Minutes": 30}, "IntervalEnds": {"Hours": 16, "Minutes": 45}},
        "9:00pm-11:00pm": {"IntervalStarts": {"Hours": 21, "Minutes": 0}, "IntervalEnds": {"Hours": 23, "Minutes": 0}},
        "6:00 and 7:30": {"Starts": {"Hours": 18, "Minutes": 0}}, #again play pretend
        "7:20pm": {"Starts": {"Hours": 19, "Minutes": 20}},
        "7:15 PM": {"Starts": {"Hours": 19, "Minutes": 15}},
        "6:00am on Wednesday and 6:30am on Sunday": {"ResultsByDay": {
            0: {"Starts": {"Hours": 6, "Minutes": 30}},
            3: {"Starts": {"Hours": 6, "Minutes": 0}}
        }},
        "6:30-7:30": {"IntervalStarts": {"Hours": 18, "Minutes": 30}, "IntervalEnds": {"Hours": 19, "Minutes": 30}},
        "2pm-3pm": {"IntervalStarts": {"Hours": 14, "Minutes": 0}, "IntervalEnds": {"Hours": 15, "Minutes": 0}},
        "Evenings": {"Varies": True},
        "5-6pm": {"IntervalStarts": {"Hours": 17, "Minutes": 0}, "IntervalEnds": {"Hours": 18, "Minutes": 0}},
        "7:15 PM": {"Starts": {"Hours": 19, "Minutes": 15}},
        "18:00 (non-routine)": {"Starts": {"Hours": 18, "Minutes": 0}},
        "7:oo PM": {"Starts": {"Hours": 19, "Minutes": 0}},
        "7:00 PM (EST)": {"Starts": {"Hours": 19, "Minutes": 0}},
        "8-5": {"IntervalStarts": {"Hours": 8, "Minutes": 0}, "IntervalEnds": {"Hours": 17, "Minutes": 0}},
        "3-5": {"IntervalStarts": {"Hours": 15, "Minutes": 0}, "IntervalEnds": {"Hours": 17, "Minutes": 0}},
        "6:30-8:00": {"IntervalStarts": {"Hours": 18, "Minutes": 30}, "IntervalEnds": {"Hours": 20, "Minutes": 0}},
        "8:15": {"Starts": {"Hours": 20, "Minutes": 15}},
        "Sun. 4-6 pm, Tue. 7-9 pm, Thur. 8-10 pm": {"ResultsByDay": {
            0: {"IntervalStarts": {"Hours": 16, "Minutes": 0}, "IntervalEnds": {"Hours": 18, "Minutes": 0}},
            2: {"IntervalStarts": {"Hours": 19, "Minutes": 0}, "IntervalEnds": {"Hours": 21, "Minutes": 0}},
            4: {"IntervalStarts": {"Hours": 18, "Minutes": 0}, "IntervalEnds": {"Hours": 20, "Minutes": 0}}
        }},
        "3:30-4:45pm": {"IntervalStarts": {"Hours": 15, "Minutes": 30}, "IntervalEnds": {"Hours": 16, "Minutes": 45}},
        "6-8 PM": {"IntervalStarts": {"Hours": 18, "Minutes": 0}, "IntervalEnds": {"Hours": 20, "Minutes": 0}},
        "5:15 P.M.": {"Starts": {"Hours": 17, "Minutes": 15}},
        "2pm-4pm (Sun) & 4pm-6pm (Fri)": {"ResultsByDay": {
            0: {"IntervalStarts": {"Hours": 14, "Minutes": 0}, "IntervalEnds": {"Hours": 16, "Minutes": 0}},
            5: {"IntervalStarts": {"Hours": 16, "Minutes": 0}, "IntervalEnds": {"Hours": 18, "Minutes": 0}}
        }},
        "1-3 p.m.": {"IntervalStarts": {"Hours": 13, "Minutes": 0}, "IntervalEnds": {"Hours": 15, "Minutes": 0}},
        "8:00am-4:45pm": {"IntervalStarts": {"Hours": 8, "Minutes": 0}, "IntervalEnds": {"Hours": 16, "Minutes": 45}},
        "Monday 6-8 pm; Tuesday 6-8 pm, Thursday 8-10 pm": {"ResultsByDay": {
            1: {"IntervalStarts": {"Hours": 18, "Minutes": 0}, "IntervalEnds": {"Hours": 20, "Minutes": 0}},
            2: {"IntervalStarts": {"Hours": 18, "Minutes": 0}, "IntervalEnds": {"Hours": 20, "Minutes": 0}},
            4: {"IntervalStarts": {"Hours": 20, "Minutes": 0}, "IntervalEnds": {"Hours": 22, "Minutes": 0}}
        }},
        "Typically, social and informal discussions 5:30 pm, business meeting 6 pm for regular monthly meetings": {"Starts": {"Hours": 17, "Minutes": 30}},
        "Sun: 9 AM Mon: 7:30 PM, Wed: 8 PM": {"ResultsByDay": {
            0: {"Starts": {"Hours": 9, "Minutes": 0}},
            1: {"Starts": {"Hours": 19, "Minutes": 30}},
            3: {"Starts": {"Hours": 20, "Minutes": 0}}
        }},
        "8-9:30": {"IntervalStarts": {"Hours": 20, "Minutes": 0}, "IntervalEnds": {"Hours": 21, "Minutes": 30}},
        "7:00PMPM": {"Starts": {"Hours": 19, "Minutes": 0}},
        "6:30-8pm": {"IntervalStarts": {"Hours": 18, "Minutes": 30}, "IntervalEnds": {"Hours": 20, "Minutes": 0}},
        "8am-5pm": {"IntervalStarts": {"Hours": 8, "Minutes": 0}, "IntervalEnds": {"Hours": 17, "Minutes": 0}},
        "6:45 AM-8:45 AM": {"IntervalStarts": {"Hours": 6, "Minutes": 45}, "IntervalEnds": {"Hours": 8, "Minutes": 45}},
        "10:30 AM": {"Starts": {"Hours": 10, "Minutes": 30}},
    }
    return srMap[uncapitalizedString]
