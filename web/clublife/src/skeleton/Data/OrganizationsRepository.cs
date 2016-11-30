using System;
using System.Collections.Generic;
using System.Linq;
using skeleton.Models;
using MongoDB.Driver;
using MongoDB.Bson;
using Microsoft.AspNetCore.Mvc;

namespace skeleton.Data {
  public class OrganizationsRepository : IOrganizationsRepository {
    private IMongoDatabase database;

    public OrganizationsRepository() {
      var credential = Credentials.mongoCredential;
      var settings = new MongoClientSettings {
        Credentials = new[] {
          credential
        },
        Server = new MongoServerAddress(Credentials.mongoURL, Credentials.mongoPort)
      };

      var client = new MongoClient(settings);

      database = client.GetDatabase("clublife-db");
    }

    #region Organizations
    public IEnumerable<Organization> GetAllOrganizations() {
      return database.GetCollection<Organization>("organizations").AsQueryable();
    }

    public Organization GetOrganizationById(ObjectId id) {
      return GetAllOrganizations().Where(x => x.Id == id).FirstOrDefault();
    }

    public IEnumerable<Organization> FindOrganizationByName(string name) {
      return GetAllOrganizations().Where(x => x.name.ToLower().Contains(name.ToLower()));
    }

    //TODO: Make day into an Enumerable
    //TODO: clean up the "Organization Meeting Time" on Mongo then fix this function
    public IEnumerable<Organization> FindOrganizationByDayAndTime(string day, string time = null) {
      var orgs = GetAllOrganizations();

      //Just by day of week
      if (time == null) {
        return orgs.Where(x => x.OrganizationMeetingDay.Contains(day));
      } else { //day and time
        var orgsOnDay = orgs.Where(x => x.OrganizationMeetingDay.Contains(day));
        return orgsOnDay.Where(x => x.OrganizationMeetingTime.Contains(time));
      }
    }

    public IEnumerable<Organization> FindOrganizationByTag(string tag) {
      return GetAllOrganizations().Where(x => x.MainSummary.ToLower().Contains(tag.ToLower()));
    }

    public async void UpdateOrganizationAsync(Organization org) {
      var coll = database.GetCollection<Organization>("organizations");

      var filter = Builders<Organization>.Filter.Eq(x => x.Id, org.Id);
      var update = Builders<Organization>.Update
        .Set(x => x.url, org.url)
        .Set(x => x.VicePresidentName, org.VicePresidentName)
        .Set(x => x.SecretaryEmail, org.SecretaryEmail)
        .Set(x => x.img, org.img)
        .Set(x => x.SecondaryAdvisorEmail, org.SecondaryAdvisorEmail)
        .Set(x => x.OrganizationEmail, org.OrganizationEmail)
        .Set(x => x.name, org.name)
        .Set(x => x.AdvisorDepartment, org.AdvisorDepartment)
        .Set(x => x.ParentOrganization, org.ParentOrganization)
        .Set(x => x.OrganizationMeetingDay, org.OrganizationMeetingDay)
        .Set(x => x.OrganizationMeetingLocation, org.OrganizationMeetingLocation)
        //.Set(x => x.MeetingDay, org.MeetingDay)
        .Set(x => x.SecondaryAdvisorNameAndTitle, org.SecondaryAdvisorNameAndTitle)
        .Set(x => x.primarycontact, org.primarycontact)
        .Set(x => x.AdvisorNameAndTitle, org.AdvisorNameAndTitle)
        .Set(x => x.SecondaryAdvisorPhone, org.SecondaryAdvisorPhone)
        .Set(x => x.OrganizationMeetingTime, org.OrganizationMeetingTime)
        .Set(x => x.PresidentEmail, org.PresidentEmail)
        .Set(x => x.MainSummary, org.MainSummary)
        .Set(x => x.AdvisorPhone, org.AdvisorPhone)
        .Set(x => x.SecondaryAdvisorDepartment, org.SecondaryAdvisorDepartment)
        .Set(x => x.AdvisorEmail, org.AdvisorEmail)
        .Set(x => x.SecretaryName, org.SecretaryName)
        .Set(x => x.summary, org.summary)
        .Set(x => x.AboutSummary, org.AboutSummary)
        .Set(x => x.VicePresidentEmail, org.VicePresidentEmail)
        //.Set(x => x.MeetingTime, org.MeetingTime)
        .Set(x => x.PresidentName, org.PresidentName)
        .Set(x => x.TreasurerEmail, org.TreasurerEmail)
        //.Set(x => x.TreasurerName, org.TreasurerName);
        .Set(x => x.Leaders, org.Leaders)
        .Set(x => x.Officers, org.Officers)
        .Set(x => x.Members, org.Members)
        .Set(x => x.Posts, org.Posts)
        .Set(x => x.Events, org.Events)
        .Set(x => x.PendingRequests, org.PendingRequests);

      await coll.UpdateOneAsync(filter, update);
    }

    public async void CreateNewOrganizationAsync(Organization org) {
      org.Id = new ObjectId();
      await database.GetCollection<Organization>("organizations").InsertOneAsync(org);
    }
    #endregion

    #region Posts
    public Post GetPost(ObjectId id) {
      return database.GetCollection<Post>("posts").AsQueryable().Where(x => x.Id == id).FirstOrDefault();
    }

    public IEnumerable<Post> FindPostsByOrganization(ObjectId id) {
      var postIds = GetOrganizationById(id).Posts.ToList().Select(x => new ObjectId(x));

      return database.GetCollection<Post>("posts").AsQueryable().Where(x => postIds.Contains(x.Id));
    }

    public async void UpdatePostAsync(Post post) {
      var coll = database.GetCollection<Post>("posts");

      var filter = Builders<Post>.Filter.Eq(x => x.Id, post.Id);
      var update = Builders<Post>.Update
        .Set(x => x.Content, post.Content)
        .Set(x => x.Subject, post.Subject)
        .Set(x => x.Club, post.Club)
        .Set(x => x.Author, post.Author);
      await coll.UpdateOneAsync(filter, update);
    }

    public async void CreateNewPostAsync(Post post) {
      post.Created = DateTime.UtcNow;

      await database.GetCollection<Post>("posts").InsertOneAsync(post);

      var org = GetOrganizationById(new ObjectId(post.Club));
      org.Posts.Add(post.Id.ToString());

      UpdateOrganizationAsync(org);
    }
    #endregion

    #region Events
    public Event GetEvent(ObjectId id) {
      return database.GetCollection<Event>("events").AsQueryable().Where(x => x.Id == id).FirstOrDefault();
    }

    public IEnumerable<Event> FindEventsByOrganization(ObjectId id) {
      var eventIds = GetOrganizationById(id).Events.ToList().Select(x => new ObjectId(x));
      return database.GetCollection<Event>("events").AsQueryable().Where(x => eventIds.Contains(x.Id));
    }

    public IEnumerable<Event> FindPublicEvents() {
      return database.GetCollection<Event>("events").AsQueryable().Where(x => x.IsPublic);
    }

    public async void UpdateEventAsync(Event @event) {
      var coll = database.GetCollection<Event>("events");

      var filter = Builders<Event>.Filter.Eq(x => x.Id, @event.Id);
      var update = Builders<Event>.Update
        .Set(x => x.Content, @event.Content)
        .Set(x => x.Subject, @event.Subject)
        .Set(x => x.StartTime, @event.StartTime)
        .Set(x => x.EndTime, @event.EndTime)
        .Set(x => x.RSVP, @event.RSVP)
        .Set(x => x.IsPublic, @event.IsPublic)
        .Set(x => x.Club, @event.Club)
        .Set(x => x.Author, @event.Author);
      await coll.UpdateOneAsync(filter, update);
    }

    public async void CreateNewEventAsync(Event @event) {
      @event.Created = DateTime.UtcNow;
      await database.GetCollection<Event>("events").InsertOneAsync(@event);

      var org = GetOrganizationById(new ObjectId(@event.Club));
      org.Posts.Add(@event.Id.ToString());

      UpdateOrganizationAsync(org);
    }
    #endregion

    #region Members
    public void ApproveMember(ObjectId userId, ObjectId clubId, bool approved) {
      var org = GetOrganizationById(clubId);
      org.PendingRequests.Remove(userId.ToString());

      if (approved) {
        var userRepo = new UsersRepository();
        var user = userRepo.GetUserById(userId);
        user.Clubs.Add(clubId.ToString());
        userRepo.UpdateUserAsync(user);

        org.Members.Add(userId.ToString());
      }

      UpdateOrganizationAsync(org);
    }
    #endregion
  }
}
