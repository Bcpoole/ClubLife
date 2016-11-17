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
    [Route("{id}")]
    public Organization Get(string id) {
      return Repo.GetOrganizationById(new ObjectId(id));
    }

    //TODO Not sure how to handle paramters ATM, json in request header? Will check when not tired
    // PUT api/organizations/newOrganization
    [HttpPut("newOrganization")]
    public void CreateNewOrganization() {
      throw new NotImplementedException();
      //Repo.CreateNewOrganization();
    }
    // PUT api/organizations/newOrganization?org=someJsonObject???
    [HttpPut("newOrganization")]
    public void CreateNewOrganization(Organization org) {
      throw new NotImplementedException();
      //Repo.CreateNewOrganization();
    }
    // POST api/organizations/581b77c29534b37d50c51b6c
    /// <param name="id">club id</param>
    [HttpPost("{id}")]
    [Route("{id}")]
    public void UpdateOrganization(string id) {
      throw new NotImplementedException();
      //Repo.UpateOrganization(new ObjectId(id));
    }

    // GET api/organizations/name?name=japan
    [Route("name")]
    public IActionResult GetOrganizationByName(string name) {
      var orgs = Repo.FindOrganizationByName(name);
      if (orgs == null) {
        return NotFound();
      }
      return Ok(orgs);
    }

    // TODO: look at Jonthan's Cleandate proprty, add that to the model, and do fancy stuff
    [Route("meetingTime")]
    public IActionResult GetOrganizationByMeetingTime(string day, string time) {
      var orgs = Repo.FindOrganizationByDayAndTime(day, time);
      if (orgs == null) {
        return NotFound();
      }
      return Ok(orgs);
    }

    // GET api/organizations/tag?tag=computer
    [Route("tag")]
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

    // GET api/organizations/posts?id=581b77c29534b37d50c51b6c
    /// <param name="id">club id</param>
    [Route("posts")]
    public IActionResult GetPostsByOrganization(string id) {
      var posts = Repo.FindPostsByOrganization(new ObjectId(id));
      if (posts == null) {
        return NotFound();
      }
      return Ok(posts);
    }
    // PUT api/organizations/posts?id=581b77c29534b37d50c51b6c
    /// <param name="id">club id</param>
    [HttpPut("posts")]
    public void CreateNewPost(string id) {
      throw new NotImplementedException();
      //Repo.CreateNewPost(new ObjectId(id));
    }
    // POST api/organizations/posts?id=5824ebbb17b44627c34fa678
    /// <param name="id">post id</param>
    [HttpPost("posts")]
    //public void UpdatePost(string id) {
    //public void UpdatePost(string jsonList) {
    //public void UpdatePost([FromBody]dynamic value) {
    //public void UpdatePost([FromBody]Newtonsoft.Json.Linq.JObject value) {
    public void UpdatePost(Post post) {
      throw new NotImplementedException();
      //Repo.UpatePost(new ObjectId(id));
    }
    #endregion

    #region Events
    // GET api/organizations/events/5824ebbb17b44627c34fa678
    /// <param name="id">event id</param>
    [HttpGet("posts/{id}")]
    public IActionResult GetEvent(string id) {
      var @event = Repo.GetEvent(new ObjectId(id));
      if (@event == null) {
        return NotFound();
      }
      return Ok(@event);
    }

    // GET api/organizations/events?id=581b77c29534b37d50c51b6c
    [Route("events")]
    public IActionResult GetEventsByOrganization(string id) {
      var events = Repo.FindEventsByOrganization(new ObjectId(id));
      if (events == null) {
        return NotFound();
      }
      return Ok(events);
    }
    // PUT api/organizations/events?id=581b77c29534b37d50c51b6c
    /// <param name="id">club id</param>
    [HttpPut("events")]
    public void CreateNewEvent(string id) {
      throw new NotImplementedException();
      //Repo.CreateNewEvent(new ObjectId(id));
    }
    // POST api/organizations/events?id=5824eb7817b44627c34fa676
    /// <param name="id">event id</param>
    [HttpPost("events")]
    public void UpdateEvent(string id) {
      throw new NotImplementedException();
      //Repo.UpateEvent(new ObjectId(id));
    }

    // GET api/organizations/publicEvents
    [Route("publicEvents")]
    public IActionResult GetPublicEvents() {
      var events = Repo.FindPublicEvents();
      if (events == null) {
        return NotFound();
      }
      return Ok(events);
    }
    #endregion
  }
}
