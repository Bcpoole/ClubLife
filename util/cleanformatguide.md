Format of a club's datetime:

Club is:

```
{
    "Key": "Value",
    ...,
    "CleanDayResults": {
        # ONE OF THE FOLLOWING KEY-VALUES. JUST ONE.
        "Day": n
        ### 0 = Sunday, ..., 6 = Saturday
        "Days": [i,j,k,...]
        "DaysOfMonth": {
            n: "BIWEEKLY" #OR
            n: "LAST" #OR
            n: [1,3] #i.e. first and third n-day of the month. note there can be >1 n; mutiple keys
        },
        "DaysOfMonthFrequency": {
            n: [1] #usually for "once a month", occasionally other numbers. can be multiple n's/keys
        },
        "Date": "2016-12-25", # ISO-8601
        "DatesOfMonth": [11], #for 11th of every month
        "DayNotApplicable": True,
        "Varies": True,
        "TBD": True
    },
    "CleanTimeResults":
        # ONE OF THE FOLLOWING:
        {"Starts": {"Hours": 0-23, "Minutes": 0-59}}
        {"IntervalStarts": {"Hours": m, "Minutes": n}}
        {"Varies": True}
        {"TimeNotApplicable": True}
        {"TBD": True}
        ###### OR, IT COULD HAVE DIFFERENT RESULTS FOR EACH DAY, IN WHICH CASE THE RESULTS LOOKS LIKE:
        {"ResultsByDay": {
            # this nested object has keys equal to days 0,1,2,3,4,5,6, and the values are like nested results objects
            # so e.g.
            2: {"IntervalStarts": {"Hours": 18, "Minutes": 30}, "IntervalEnds": {"Hours": 20, "Minutes": 0}},
            5: {"Starts": {"Hours": 16, "Minutes": 20}}
        }}
}
```
