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

    public IEnumerable<User> FindUserByUsername(string username) {
      return GetAllUsers().Where(x => x.Username.ToLower().Contains(username.ToLower()));
    }

    public IEnumerable<User> FindUserByName(string name) {
      return GetAllUsers().Where(x => x.Name.ToLower().Contains(name.ToLower()));
    }

    public IEnumerable<User> FindUsersInClubById(ObjectId id) {
      return GetAllUsers().Where(x => x.Clubs.Contains(id.ToString()));
    }
    #endregion

    //POST
    public async void UpdateUserName(ObjectId id, string name) {

      var user = GetUserById(id);
      var col = database.GetCollection<User>("users");

      var filter = Builders<User>.Filter.Eq(x => x.Id, id);
      var update = Builders<User>.Update.Set(x => x.Name, name);
      await col.UpdateOneAsync(filter, update);
    }

    public void UpdateUser(ObjectId id) {
      throw new NotImplementedException();
    }
  }
}
