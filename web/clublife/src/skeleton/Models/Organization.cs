using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;

namespace skeleton.Models {
  [BsonIgnoreExtraElements]
  public class Organization {
    [JsonConverter(typeof(ObjectIdConverter))]
    public ObjectId Id { get; set; }
    [BsonElement("Secondary Advisor Department")]
    public string SecondaryAdvisorDepartment { get; set; }
    [BsonElement("Organization Meeting Location")]
    public string OrganizationMeetingLocation { get; set; }
    [BsonElement("Vice-President Email")]
    public string VicePresidentEmail { get; set; }
    [BsonElement("President Email")]
    public string PresidentEmail { get; set; }
    [BsonElement("Parent Organization")]
    public string ParentOrganization { get; set; }
    [BsonElement("Organization Meeting Time")]
    public string OrganizationMeetingTime { get; set; }
    [BsonElement("Advisor Email")]
    public string AdvisorEmail { get; set; }
    [BsonElement("Vice-President Name")]
    public string VicePresidentName { get; set; }
    [BsonElement("Advisor Phone")]
    public string AdvisorPhone { get; set; }
    [BsonElement("Organization E-mail")]
    public string OrganizationEmail { get; set; }
    public string img { get; set; }
    [BsonElement("Secretary Name")]
    public string SecretaryName { get; set; }
    [BsonElement("Advisor Department")]
    public string AdvisorDepartment { get; set; }
    [BsonElement("Secretary Email")]
    public string SecretaryEmail { get; set; }
    [BsonElement("primary contact")]
    public string primarycontact { get; set; }
    [BsonElement("Organization Meeting Day")]
    public string OrganizationMeetingDay { get; set; }
    [BsonElement("Secondary Advisor Name &amp; Title")]
    public string SecondaryAdvisorNameAndTitle { get; set; }
    public string url { get; set; }
    [BsonElement("Advisor Name &amp; Title")]
    public string AdvisorNameAndTitle { get; set; }
    [BsonElement("Secondary Advisor Phone")]
    public string SecondaryAdvisorPhone { get; set; }
    public string summary { get; set; }
    [BsonElement("Treasurer Email")]
    public string TreasurerEmail { get; set; }
    [BsonElement("Secondary Advisor Email")]
    public string SecondaryAdvisorEmail { get; set; }
    [BsonElement("Main Summary")]
    public string MainSummary { get; set; }
    [BsonElement("About Summary")]
    public string AboutSummary { get; set; }
    public string name { get; set; }
    [BsonElement("President Name")]
    public string PresidentName { get; set; }

    [BsonElement("leaders")]
    public IList<string> Leaders { get; set; }
    [BsonElement("officers")]
    public IList<string> Officers { get; set; }
    [BsonElement("members")]
    public IList<string> Members { get; set; }

    [BsonElement("events")]
    public IList<string> Events { get; set; }
    [BsonElement("posts")]
    public IList<string> Posts { get; set; }

    [BsonElement("pendingRequests")]
    public IList<string> PendingRequests { get; set; }

    //private dynamic meetingDay;
    //[BsonElement("CleanDayResults")]
    //public dynamic MeetingDay {
    //  get {
    //    return GetMeetingDay();
    //  } set {
    //    meetingDay = value;
    //  }
    //}

    //private dynamic meetingTime;
    //[BsonElement("CleanTimeResults")]
    //public dynamic MeetingTime {
    //  get {
    //    return GetMeetingTime();
    //  }
    //  set {
    //    meetingTime = value;
    //  }
    //}

    //private string GetMeetingDay() {
    //  string key = Enumerable.First(meetingDay).Key;
    //  var val = Enumerable.First(meetingDay).Value;

    //  if (key == "Day") {
    //    return GetDayByIndex(val);
    //  } else if (key == "Days") {
    //    var days = "";
    //    foreach (var day in val) {
    //      days += day + ", ";
    //    }
    //    return days.Substring(0, days.Length - 2);
    //  } else if (key == "DatesOfMonth") {
    //    string suffix = "";

    //    char suffixVal = val.ToString().Last();
    //    if (suffixVal == '1') {
    //      suffix = "st";
    //    } else if (suffixVal == '2') {
    //      suffix = "nd";
    //    } else if (suffixVal == '3') {
    //      suffix = "rd";
    //    } else {
    //      suffix = "th";
    //    }

    //    return $"{val}{suffix} day of each each month";
    //  } else if (key == "Varies" || key == "DaysOfMonth" || key == "DaysOfMonthFrequency") {
    //    return "Varies";
    //  } else { //TBD, a date, or worthless data
    //    return "TBD";
    //  }
    //}

    private string GetDayByIndex(int idx) {
      switch (idx) {
        case 0:
          return "Sun";
        case 1:
          return "Mon";
        case 2:
          return "Tue";
        case 3:
          return "Wed";
        case 4:
          return "Thu";
        case 5:
          return "Fri";
        case 6:
          return "Sat";
        default:
          throw new System.Exception("Invalid day index. Index must be between 0-6");
      }
    }

    //public string GetMeetingTime() {
    //  string key = Enumerable.First(MeetingTime).Key;
    //  var val = Enumerable.First(MeetingTime).Value;

    //  //Commented out until we decide to add in calendar search feature or not
    //  //      if (key == "Starts") {
    //  //        // {"Starts": {"Hours": 0-23, "Minutes": 0-59}}
    //  //      } else if (key == "IntervalStarts") {
    //  //        // {"IntervalStarts": {"Hours": m, "Minutes": n}}
    //  //      } else if (key == "ResultsByDay") {
    //  ////        {
    //  ////          "ResultsByDay": {
    //  ////            # this nested object has keys equal to days 0,1,2,3,4,5,6, and the values are like nested results objects
    //  ////            # so e.g.
    //  ////            2: { "IntervalStarts": { "Hours": 18, "Minutes": 30}, "IntervalEnds": { "Hours": 20, "Minutes": 0} },
    //  ////            5: { "Starts": { "Hours": 16, "Minutes": 20} }
    //  ////          }
    //  ////        }
    //  if (key == "Starts" || key == "IntervalStarts" || key == "ResultsByDay") {
    //    return OrganizationMeetingTime;
    //  } else if (key == "Varies") {
    //    return "Varies";
    //  } else {
    //    return "TBD";
    //  }
    //}
  }
}
