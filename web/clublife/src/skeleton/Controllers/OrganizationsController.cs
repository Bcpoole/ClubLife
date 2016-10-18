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

        // GET api/organizations/2
        [HttpGet("{id}")]
        [Route("{id}", Name = "GetOrganizationItemByIdRoute")]
        public Organization Get(string id)
        {
            return Repo.GetOrganizationById(id);
        }
   
        [Route("name")]
        public IActionResult GetOrganizationByName(string name) {
            var orgs = Repo.FindOrganizationByName(name);
            if (orgs == null) {
                return NotFound();
            }
            return Ok(orgs);
        }

        [Route("meetingTime")]
        public IActionResult GetOrganizationByMeetingTime(string day, string time) {
            var orgs = Repo.FindOrganizationByDayAndTime(day, time);
            if (orgs == null) {
                return NotFound();
            }
            return Ok(orgs);
        }

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
