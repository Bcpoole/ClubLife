using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using skeleton.Models;

namespace skeleton.Data {
  public class UsersRepository : IUsersRepository {
    private IMongoDatabase database;

    public UsersRepository() {
      var credential = Credentials.mongoCredential;
      var settings = new MongoClientSettings {
        Credentials = new[] {
          credential
        },
        Server = new MongoServerAddress(Credentials.mongoURL, Credentials.mongoPort)
      };

      var client = new MongoClient(settings);

      database = client.GetDatabase("clublife-db");
    }

    #region GET
    public IEnumerable<User> GetAllUsers() {
      return database.GetCollection<User>("users").AsQueryable();
    }

    public User GetUserById(ObjectId id) {
      return GetAllUsers().Where(x => x.Id == id).FirstOrDefault();
    }

    public User FindUserByUsername(string username) {
      return GetAllUsers().Where(x => x.Username.ToLower() == username.ToLower()).FirstOrDefault();
    }

    public IEnumerable<User> FindUserByName(string name) {
      return GetAllUsers().Where(x => x.Name.ToLower().Contains(name.ToLower()));
    }

    public IEnumerable<User> FindUsersInClubById(ObjectId id) {
      return GetAllUsers().Where(x => x.Clubs.Contains(id.ToString()));
    }
    #endregion

    public async void UpdateUserAsync(User user) {
      var dbUser = GetUserById(user.Id);
      if (dbUser.Username != user.Username) {
        //check if already exists
        //do stuff
      }

        var coll = database.GetCollection<User>("users");

      var filter = Builders<User>.Filter.Eq(x => x.Id, user.Id);
      var update = Builders<User>.Update
        .Set(x => x.Name, user.Name)
        .Set(x => x.Clubs, user.Clubs);
      await coll.UpdateOneAsync(filter, update);
    }

    public async void CreateNewUserAsync(User user) {
      var coll = database.GetCollection<User>("users");

      user.Id = new ObjectId();
      await coll.InsertOneAsync(user);

      var filter = Builders<User>.Filter.Eq(x => x.Id, user.Id);
      var update = Builders<User>.Update
        .Set(x => "salt", Guid.NewGuid().ToString())
        .Set(x => "password", "implment OAuth on Frontend please so I can just store tokens");
      await coll.UpdateOneAsync(filter, update);
    }
  }
}
