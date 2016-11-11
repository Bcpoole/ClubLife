using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace skeleton.Models {
  [BsonIgnoreExtraElements]
  public class User {
    public ObjectId Id { get; set; }
    [BsonElement("username")]
    public string Username { get; set; }
    [BsonElement("name")]
    public string Name { get; set; }
    [BsonElement("clubs")]
    public IEnumerable<ObjectId> Clubs { get; set; }
  }
}
