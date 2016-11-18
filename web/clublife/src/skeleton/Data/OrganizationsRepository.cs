using System;
using System.Collections.Generic;
using System.Linq;
using skeleton.Models;
using MongoDB.Driver;
using MongoDB.Bson;

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
        .Set(x => x.Subject, post.Subject);
      await coll.UpdateOneAsync(filter, update);
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
        .Set(x => x.IsPublic, @event.IsPublic);
      await coll.UpdateOneAsync(filter, update);
    }
    #endregion
  }
}
