using System;
using System.Collections.Generic;
using System.Globalization;
using Microsoft.AspNetCore.Mvc;
using skeleton.Data;
using skeleton.Models;
using MongoDB.Bson;
using System.Security.Claims;
using System.Linq;

namespace skeleton.Controllers {
  [Route("api/[controller]")]
  public class UsersController : Controller {
    public IUsersRepository Repo { get; set; }

    public UsersController([FromServices] IUsersRepository repo) {
      Repo = repo;
    }

    // GET api/users
    [HttpGet]
    public IEnumerable<User> Get() {
      return Repo.GetAllUsers();
    }

    // GET api/users/5824e62917b44627c34fa66e
    [HttpGet("{id}")]
    [Route("{id}")]
    public User Get(string id) {
      return Repo.GetUserById(new ObjectId(id));
    }

    // GET api/users/username?username=bcpoole
    [Route("username")]
    public IActionResult GetUserByUsername(string username) {
      var orgs = Repo.FindUserByUsername(username);
      if (orgs == null) {
        return NotFound();
      }
      return Ok(orgs);
    }

    // GET api/users/name?name=brandon
    [Route("name")]
    public IActionResult GetUserByName(string name) {
      var orgs = Repo.FindUserByName(name);
      if (orgs == null) {
        return NotFound();
      }
      return Ok(orgs);
    }    

    // GET api/users/club?id=581b77c29534b37d50c51b6c
    [Route("club")]
    public IActionResult GetUsersInClubById(string id) {
      var events = Repo.FindUsersInClubById(new ObjectId(id));
      if (events == null) {
        return NotFound();
      }
      return Ok(events);
    }

    // GET api/users/currentUser
    [Route("currentUser")]
    public IActionResult GetCurrentUser() {
      var principal = HttpContext.Authentication.HttpContext.User;
      var user = principal.Claims.Where(x => x.Type.Contains("emailaddress")).FirstOrDefault()?.Value;

      if (user == null) {
        return Ok("");
      }
      return Ok(user);
    }
  }
}
