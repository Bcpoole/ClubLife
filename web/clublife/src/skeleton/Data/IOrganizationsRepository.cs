using System.Collections.Generic;
using skeleton.Models;
using MongoDB.Bson;

namespace skeleton.Data {
  public interface IOrganizationsRepository {
    IEnumerable<Organization> GetAllOrganizations();
    Organization GetOrganizationById(ObjectId id);
    IEnumerable<Organization> FindOrganizationByName(string name);
    IEnumerable<Organization> FindOrganizationByDayAndTime(string day, string time = null);
    IEnumerable<Organization> FindOrganizationByTag(string tag);

    Post GetPost(ObjectId id);
    IEnumerable<Post> FindPostsByOrganization(ObjectId id);
    IEnumerable<Event> FindEventsByOrganization(ObjectId id);
    void UpdatePostAsync(Post post);

    Event GetEvent(ObjectId id);
    IEnumerable<Event> FindPublicEvents();
    void UpdateEventAsync(Event @event);
  }
}