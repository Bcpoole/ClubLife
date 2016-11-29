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
    public User Get(string id) {
      return Repo.GetUserById(new ObjectId(id));
    }
    // PUT api/users/new
    [HttpPut("new")]
    public void CreateNewUser([FromBody] User user) {
      Repo.CreateNewUserAsync(user);
    }
    // POST api/users/5824e62917b44627c34fa66e
    /// <param name="id">user id</param>
    [HttpPost("{id}")]
    public void UpdateUser([FromBody] User user) {
      Repo.UpdateUserAsync(user);
    }

    // GET api/users/username?username=bcpoole
    [HttpGet("username")]
    public IActionResult GetUserByUsername(string username) {
      var orgs = Repo.FindUserByUsername(username);
      if (orgs == null) {
        return NotFound();
      }
      return Ok(orgs);
    }

    // GET api/users/name?name=brandon
    [HttpGet("name")]
    public IActionResult GetUserByName(string name) {
      var orgs = Repo.FindUserByName(name);
      if (orgs == null) {
        return NotFound();
      }
      return Ok(orgs);
    }    

    // GET api/users/club?id=581b77c29534b37d50c51b6c
    [HttpGet("club")]
    public IActionResult GetUsersInClubById(string id) {
      var events = Repo.FindUsersInClubById(new ObjectId(id));
      if (events == null) {
        return NotFound();
      }
      return Ok(events);
    }

    // POST api/users/5824e62917b44627c34fa66e/leave/581b77c29534b37d50c51b6c
    [HttpPost("{userId}/leave/{clubId}")]
    public void LeaveClub(string userId, string clubId) {
      Repo.LeaveClub(new ObjectId(userId), new ObjectId(clubId));
    }
  }
}
