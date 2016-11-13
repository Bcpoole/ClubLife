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

    // GET api/organizations/posts?id=581b77c29534b37d50c51b6c
    [Route("posts")]
    public IActionResult GetPostsByOrganization(string id) {
      var posts = Repo.FindPostsByOrganization(new ObjectId(id));
      if (posts == null) {
        return NotFound();
      }
      return Ok(posts);
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

    // GET api/organizations/publicEvents
    [Route("publicEvents")]
    public IActionResult GetPublicEvents() {
      var events = Repo.FindPublicEvents();
      if (events == null) {
        return NotFound();
      }
      return Ok(events);
    }
  }
}
