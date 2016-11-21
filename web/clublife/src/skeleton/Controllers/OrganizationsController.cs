using System;
using System.Collections.Generic;
using System.Globalization;
using Microsoft.AspNetCore.Mvc;
using skeleton.Data;
using skeleton.Models;
using MongoDB.Bson;

namespace skeleton.Controllers {
  [Route("api/[controller]")]
  public class OrganizationsController : Controller {
    public IOrganizationsRepository Repo { get; set; }

    public OrganizationsController([FromServices] IOrganizationsRepository repo) {
      Repo = repo;
    }

    #region Organizations
    // GET api/organizations
    [HttpGet]
    public IEnumerable<Organization> Get() {
      return Repo.GetAllOrganizations();
    }

    // GET api/organizations/581b77c29534b37d50c51b6c
    [HttpGet("{id}")]
    public Organization Get(string id) {
      return Repo.GetOrganizationById(new ObjectId(id));
    }

    // PUT api/organizations/new
    [HttpPut("new")]
    public void CreateNewOrganization([FromBody] Organization org) {
      Repo.CreateNewOrganizationAsync(org);
    }
    // POST api/organizations/581b77c29534b37d50c51b6c
    /// <param name="id">club id</param>
    [HttpPost("{id}")]
    public void UpdateOrganization([FromBody] Organization org) {
      Repo.UpdateOrganizationAsync(org);
    }

    // GET api/organizations/name?name=japan
    [HttpGet("name")]
    public IActionResult GetOrganizationByName(string name) {
      var orgs = Repo.FindOrganizationByName(name);
      if (orgs == null) {
        return NotFound();
      }
      return Ok(orgs);
    }

    // TODO: look at Jonthan's Cleandate proprty, add that to the model, and do fancy stuff
    [HttpGet("meetingTime")]
    public IActionResult GetOrganizationByMeetingTime(string day, string time) {
      var orgs = Repo.FindOrganizationByDayAndTime(day, time);
      if (orgs == null) {
        return NotFound();
      }
      return Ok(orgs);
    }

    // GET api/organizations/tag?tag=computer
    [HttpGet("tag")]
    public IActionResult GetOrganizationByTag(string tag) {
      var orgs = Repo.FindOrganizationByTag(tag);
      if (orgs == null) {
        return NotFound();
      }
      return Ok(orgs);
    }
    #endregion

    #region Posts
    // GET api/organizations/posts/5824ebbb17b44627c34fa678
    /// <param name="id">post id</param>
    [HttpGet("posts/{id}")]
    public IActionResult GetPost(string id) {
      var post = Repo.GetPost(new ObjectId(id));
      if (post == null) {
        return NotFound();
      }
      return Ok(post);
    }
    // POST api/organizations/posts/5824ebbb17b44627c34fa678
    /// <param name="id">post id</param>
    [HttpPost("posts/{id}")]
    public void UpdatePost([FromBody] Post post) {
      Repo.UpdatePostAsync(post);
    }

    // PUT api/organizations/581b77c29534b37d50c51b6c/posts/new
    /// <param name="id">club id</param>
    [HttpPut("{id}/posts/new")]
    public void CreateNewPost([FromBody] Post post) {
      Repo.CreateNewPostAsync(post);
    }

    // GET api/organizations/581b77c29534b37d50c51b6c
    /// <param name="id">club id</param>
    [HttpGet("{id}/posts")]
    public IActionResult GetPostsByOrganization(string id) {
      var posts = Repo.FindPostsByOrganization(new ObjectId(id));
      if (posts == null) {
        return NotFound();
      }
      return Ok(posts);
    }
    #endregion

    #region Events
    // GET api/organizations/events/5824ebbb17b44627c34fa678
    /// <param name="id">event id</param>
    [HttpGet("events/{id}")]
    public IActionResult GetEvent(string id) {
      var @event = Repo.GetEvent(new ObjectId(id));
      if (@event == null) {
        return NotFound();
      }
      return Ok(@event);
    }
    // POST api/organizations/events/5824eb7817b44627c34fa676
    /// <param name="id">event id</param>
    [HttpPost("events/{id}")]
    public void UpdateEvent([FromBody] Event @event) {
      Repo.UpdateEventAsync(@event);
    }

    // PUT api/organizations/581b77c29534b37d50c51b6c/events/new
    /// <param name="id">club id</param>
    [HttpPut("{id}/events/new")]
    public void CreateNewEvent([FromBody]Event @event) {
      Repo.CreateNewEventAsync(@event);
    }

    // GET api/organizations/581b77c29534b37d50c51b6c/events
    /// <param name="id">club id</param>
    [HttpGet("{id}/events")]
    public IActionResult GetEventsByOrganization(string id) {
      var events = Repo.FindEventsByOrganization(new ObjectId(id));
      if (events == null) {
        return NotFound();
      }
      return Ok(events);
    }

    // GET api/organizations/publicEvents
    [HttpGet("publicEvents")]
    public IActionResult GetPublicEvents() {
      var events = Repo.FindPublicEvents();
      if (events == null) {
        return NotFound();
      }
      return Ok(events);
    }
    #endregion

    #region Members
    // POST api/organizations/581b77c29534b37d50c51b6c/approve/5824e62917b44627c34fa66e?approved=true
    [HttpPost("{clubId}/approve/{userId}")]
    public void ApprovePendingUser(string userId, string clubId, bool approved) {
      Repo.ApproveMember(new ObjectId(userId), new ObjectId(clubId), approved);
    }
    #endregion
  }
}
