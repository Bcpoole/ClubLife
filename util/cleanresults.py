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
    results = {}
    t = time.strip().upper().replace(".","") #but maintain original time variable for special case handling
    nospacePMs = [str(i)+":00PM" for i in [12]+list(range(1,12,1))]
    spacePMs = [str(i)+":00 PM" for i in [12]+list(range(1,12,1))]
    nospace30PMs = [str(i)+":30PM" for i in [12]+list(range(1,12,1))]
    space30PMs = [str(i)+":30 PM" for i in [12]+list(range(1,12,1))]
    hcolon00s = [str(i)+":00" for i in list(range(10,13))+list(range(1,10))]
    hcolon30s = [str(i)+":30" for i in list(range(10,13))+list(range(1,10))]
    nocolons = [str(i)+"AM" for i in [12]+list(range(1,12))]+[str(i)+"PM" for i in [12]+list(range(1,12))]
    nocolonsWithSpaces = [str(i)+" AM" for i in [12]+list(range(1,12))]+[str(i)+" PM" for i in [12]+list(range(1,12))]
    pureNumbers = [str(i) for i in list(range(10,13,1))+list(range(1,10,1))]
    noons = ["NOON","12","12 NOON"]

    notApplicables = ["","N/A","NA","DSF","ASD","SAD","ADF","FSDF","SD","DSFDSF","SDFDSF","SDF","CONTACT US","DEF","CMROWEN@SAUAEDU","FOR MEMBERS ONLY"]

    variesStrings = ["VARIES","VARIABLE","VARIOUS","ALTERNATES EACH MONTH TO AC",
        "MULTIPLE MEETINGS EACH WEEK","ANYTIME","NOT REGULAR", "ANNOUNCED IN EMAILS",
        "AUGUST-MAY","(LOOK ON OUR","SEE WRC","AS REQUIRED",
        "DATE DETERMINED ON A MONTH-BY-MONTH BASIS", "AS NEEDED","ONCE PER MONTH","TWICE A MONTH","FLEXIBLE DEPENDING ON GROUP",
        "ONCE PER MONTH FOR A MEETING OR EVENT", "JAN ~ DEC", "WILL ANNOUNCE THROUGH EMA","ONCE A MONTH","VARY","FLEXIBLE","DIFFERENTIATE","AFTERNOON OR EVENING",
        "ANNOUNCED ON LISTSERV"]
    def isVaries():
        for s in variesStrings:
            if s in t:
                return True
        return False

    if t in nospacePMs:
        results["Starts"] = {
            "Hours": 12 + nospacePMs.index(t),
            "Minutes": 0
        }
    elif t in spacePMs:
        results["Starts"] = {
            "Hours": 12 + spacePMs.index(t),
            "Minutes": 0
        }
    elif t in nospace30PMs:
        results["Starts"] = {
            "Hours": 12 + nospace30PMs.index(t),
            "Minutes": 0
        }
    elif t in space30PMs:
        results["Starts"] = {
            "Hours": 12 + space30PMs.index(t),
            "Minutes": 0
        }
    elif t in hcolon00s:
        results["Starts"] = {
            "Hours": 10+hcolon00s.index(t),
            "Minutes": 0
        }
    elif t in hcolon30s:
        results["Starts"] = {
            "Hours": 10+hcolon30s.index(t),
            "Minutes": 0
        }
    elif t in nocolons:
        results["Starts"] = {
            "Hours": nocolons.index(t),
            "Minutes": 0
        }
    elif t in nocolonsWithSpaces:
        results["Starts"] = {
            "Hours": nocolonsWithSpaces.index(t),
            "Minutes": 0
        }
    elif t in pureNumbers:
        results["Starts"] = {
            "Hours": 10+pureNumbers.index(t),
            "Minutes": 0
        }
    elif t in noons:
        results["Starts"] = {
            "Hours": 12,
            "Minutes": 0
        }
    elif t in notApplicables:
        results["TimeNotApplicable"] = True
    elif "TBA" in t or "TBD" in t or "TO BE DETERMINED" in t:
        results["TBD"] = True
    elif isVaries():
        results["Varies"] = True
    else:
        try:
            results = specialcases.getResultsFromSpecialCaseTime(time)
        except KeyError:
            print("KeyError "+time)
            results = {}

    return results

def main():
    with open(RESULTS_FILE,"r") as f:
        clubs = json.loads(f.read())
        #specialCaseCount = 0
        for club in clubs:
            day = club["Organization Meeting Day"]
            time = club["Organization Meeting Time"]
            club["CleanDayResults"] = cleanDay(day)
            club["CleanTimeResults"] = cleanTime(time)
            #if len(club["CleanTimeResults"].keys()) == 0:
                #print(time)
                #specialCaseCount += 1
        with open(OUTPUT_FILE,"w") as g:
            g.write(json.dumps(clubs))
        #print(specialCaseCount)
    return 0

if __name__ == "__main__":
    main()
