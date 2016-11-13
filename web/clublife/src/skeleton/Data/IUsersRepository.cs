﻿using MongoDB.Bson;
using skeleton.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace skeleton.Data {
  public interface IUsersRepository {
    IEnumerable<User> GetAllUsers();
    User GetUserById(ObjectId id);
    IEnumerable<User> FindUserByName(string name);
    IEnumerable<User> FindUserByUsername(string username);
    IEnumerable<User> FindUsersInClubById(ObjectId id);
  }
}