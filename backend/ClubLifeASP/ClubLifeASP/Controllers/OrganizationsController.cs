using ClubLifeASP.Context;
using ClubLifeASP.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ClubLifeASP.Controllers
{
    [RoutePrefix("api/organizations")]
    public class OrganizationsController : ApiController
    {
        MongoContext mongoContext;
        public OrganizationsController(MongoContext mongoContext) {
            this.mongoContext = mongoContext;
        }

        public IEnumerable<Organization> GetAllOrganizations() {
            return mongoContext.GetAllOrganizations();
        }

        public IHttpActionResult GetOrganization(string id) {
            var org = mongoContext.GetOrganization(id);
            if (org == null) {
                return NotFound();
            }
            return Ok(org);
        }

        [Route("tag")]
        public IHttpActionResult GetOrganizationByTag(string tag) {
            var orgs= mongoContext.FindOrganizationByTag(tag);
            if (orgs == null) {
                return NotFound();
            }
            return Ok(orgs);
        }
    }
}
