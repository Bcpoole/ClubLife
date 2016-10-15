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
    "CleanTimeResults": {
        "TODO": "THIS"
    }
}
```
