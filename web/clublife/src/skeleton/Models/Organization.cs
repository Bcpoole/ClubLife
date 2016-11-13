using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace skeleton.Models {
  [BsonIgnoreExtraElements]
  public class Organization {
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
    public string[] Leaders { get; set; }
    [BsonElement("officers")]
    public string[] Officers { get; set; }
    [BsonElement("members")]
    public string[] Members { get; set; }
    [BsonElement("events")]
    public List<ObjectId> Events { get; set; }
    [BsonElement("posts")]
    public List<ObjectId> Posts { get; set; }
    [BsonElement("pendingRequests")]
    public List<ObjectId> PendingRequests { get; set; }

    [BsonElement("CleanDayResults")]
    public dynamic MeetingDay { get; set; }
    [BsonElement("CleanTimeResults")]
    public dynamic MeetingTime { get; set; }
  }
}
