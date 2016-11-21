using System.Collections.Generic;
using skeleton.Models;
using MongoDB.Bson;
using Microsoft.AspNetCore.Mvc;

namespace skeleton.Data {
  public interface IOrganizationsRepository {
    IEnumerable<Organization> GetAllOrganizations();
    Organization GetOrganizationById(ObjectId id);
    IEnumerable<Organization> FindOrganizationByName(string name);
    IEnumerable<Organization> FindOrganizationByDayAndTime(string day, string time = null);
    IEnumerable<Organization> FindOrganizationByTag(string tag);
    void UpdateOrganizationAsync(Organization org);
    void CreateNewOrganizationAsync(Organization org);

    Post GetPost(ObjectId id);
    IEnumerable<Post> FindPostsByOrganization(ObjectId id);
    IEnumerable<Event> FindEventsByOrganization(ObjectId id);
    void UpdatePostAsync(Post post);
    void CreateNewPostAsync(Post post);

    Event GetEvent(ObjectId id);
    IEnumerable<Event> FindPublicEvents();
    void UpdateEventAsync(Event @event);
    void CreateNewEventAsync(Event @event);

    void ApproveMember(ObjectId userId, ObjectId clubId, bool approved);
  }
}