using System;
using System.Collections.Generic;
using System.Globalization;
using Microsoft.AspNetCore.Mvc;
using skeleton.Data;
using skeleton.Models;

namespace skeleton.Controllers
{
    [Route("api/[controller]")]
    public class OrganizationsController : Controller
    {
        public IOrganizationsRepository Repo { get; set; }

        public OrganizationsController([FromServices] IOrganizationsRepository repo)
        {
            Repo = repo;
        }

        // GET api/organizations
        [HttpGet]
        public IEnumerable<Organization> Get()
        {
            return Repo.GetAllOrganizations();
        }

        // GET api/organizations/57edc4179534b37d50c50d17
        [HttpGet("{id}")]
        [Route("{id}", Name = "GetOrganizationItemByIdRoute")]
        public Organization Get(string id)
        {
            return Repo.GetOrganizationById(id);
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
            var orgs= Repo.FindOrganizationByTag(tag);
            if (orgs == null) {
                return NotFound();
            }
            return Ok(orgs);
        }
    }
}
