using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace skeleton.Models {
  [BsonIgnoreExtraElements]
  public class User {
    public ObjectId Id { get; set; }
    public string Username { get; set; }
    public IEnumerable<Organization> Clubs { get; set; }
  }
}
