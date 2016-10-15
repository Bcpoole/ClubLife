import json
import specialcases

RESULTS_FILE = "output.json"
OUTPUT_FILE = "cleanoutput.json"

def cleanDay(day):
    """
    Cleans the day string, but returns an OBJECT, to handle cases such as
    "first Sunday of the month" or "TBD"
    """
    results = {}

    day = day.strip().upper() #capitalize so we only have to handle one capitlization case

    if day == "WEDNEDAY": day = "WEDNESDAY"
    if day == "THURSDAY AT 8:00PM": day = "THU"
    if day == "EVERY WEEK ON FRIDAY": day = "FRI"
    if day == "BI-WEEKLY":
        results["Varies"] = True
        return results

    # useful constant data
    upperDays = ["SUNDAY","MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY"]
    upperDaysPlural = [d+"S" for d in upperDays]
    upperAbbrevs = ["SUN","MON","TUE","WED","THU","FRI","SAT"]
    everySpaceUpperDays = ["EVERY "+d for d in upperDays]

    notApplicables = ["","N/A","NA","DSF","ASD","SAD","ADF","FSDF","SD","DSFDSF","SDFDSF","CONTACT US","CMROWEN@SA.UA.EDU"]
    toBeDetermineds = ["TBA","TBD","TO BE DETERMINED","TO BE ANNOUNCED"]

    monToFri = ["MONDAY-FRIDAY","MONDAY - FRIDAY","M-F","MON-FRI"]
    monToThu = ["MONDAY-THURSDAY"]
    monToSun = ["MONDAY-SUNDAY"]

    variesStrings = ["VARIES","VARIABLE","VARIOUS","ALTERNATES EACH MONTH TO AC",
        "MULTIPLE MEETINGS EACH WEEK","ANYTIME","NOT REGULAR", "ANNOUNCED IN EMAILS",
        "AUGUST-MAY","(LOOK ON OUR","SEE WRC","THREE TIMES PER M","AS REQUIRED",
        "DATE DETERMINED ON A MONTH-BY-MONTH BASIS", "AS NEEDED","ONCE PER MONTH","TWICE A MONTH","FLEXIBLE DEPENDING ON GROUP",
        "ONCE PER MONTH FOR A MEETING OR EVENT", "JAN ~ DEC", "WILL ANNOUNCE THROUGH EMA","ONCE A MONTH",
        "ANNOUNCED ON LISTSERV",]
    def isVaries():
        for s in variesStrings:
            if s in day:
                return True
        return False

    def is_x_and_y_format():
        spl = day.split(" AND ")
        if len(spl) != 2:
            spl = day.split(" & ")
        if len(spl) != 2:
            return False
        days = []
        for l in [upperDays,upperDaysPlural,upperAbbrevs,everySpaceUpperDays]:
            if spl[0] in l:
                days.append(l.index(spl[0]))
        for l in [upperDays,upperDaysPlural,upperAbbrevs,everySpaceUpperDays]:
            if spl[1] in l:
                days.append(l.index(spl[1]))
        return days if len(days)==2 else False






    if day in upperDays:
        results["Day"] = upperDays.index(day)
    elif day in upperAbbrevs:
        results["Day"] = upperAbbrevs.index(day)
    elif day in upperDaysPlural:
        results["Day"] = upperDaysPlural.index(day)
    elif day in everySpaceUpperDays:
        results["Day"] = everySpaceUpperDays.index(day)
    elif is_x_and_y_format() is not False:
        results["Days"] = is_x_and_y_format() # lol this is horrible
    elif day in monToFri:
        results["Days"] = [1,2,3,4,5]
    elif day in monToThu:
        results["Days"] = [1,2,3,4]
    elif day in monToSun:
        results["Days"] = list(range(1,8,1))
    elif day in notApplicables:
        results["DayNotApplicable"] = True
    elif day in toBeDetermineds:
        results["TBD"] = True
    elif isVaries():
        results["Varies"] = True
    else:
        try:
            results = specialcases.getResultsFromSpecialCaseDay(day)
        except KeyError:
            print("KeyError "+day)
            results = {}

    return results

def cleanTime(time):
    """
    Clean the time of string, returns an object.
    """
    return "TODO: THIS"

def main():
    with open(RESULTS_FILE,"r") as f:
        clubs = json.loads(f.read())
        #specialCaseCount = 0
        for club in clubs:
            day = club["Organization Meeting Day"]
            time = club["Organization Meeting Time"]
            club["CleanDayResults"] = cleanDay(day)
            club["CleanTimeResults"] = cleanTime(time)
            #if len(r.keys()) == 0:
            #    print(day)
            #    specialCaseCount += 1
        with open(OUTPUT_FILE,"w") as g:
            g.write(json.dumps(clubs))
        #print(specialCaseCount)
    return 0

if __name__ == "__main__":
    main()
