using System;
using System.Collections.Generic;
using System.Globalization;
using Microsoft.AspNetCore.Mvc;
using skeleton.Data;
using skeleton.Models;
using MongoDB.Bson;

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
    // PUT api/users/newUser
    [HttpPost("newUser")]
    public void CreateNewUser() {
      throw new NotImplementedException();
      //Repo.CreateNewUser(");
    }
    // POST api/users/5824e62917b44627c34fa66e
    /// <param name="id">user id</param>
    [HttpPost("{id}")]
    [Route("{id}")]
    public void UpdateUser(string id) {
      throw new NotImplementedException();
      //Repo.UpdateUserName();
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
  }
}
