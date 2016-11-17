using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;
using System.Linq;

namespace skeleton.Models {
  [BsonIgnoreExtraElements]
  public class User {
    public ObjectId Id { get; set; }
    [BsonElement("username")]
    public string Username { get; set; }
    [BsonElement("name")]
    public string Name { get; set; }
    [BsonElement("clubs")]
    private IEnumerable<ObjectId> clubs { get; set; }
    public IEnumerable<string> Clubs {
      get {
        return clubs.Select(x => x.ToString());
      }
    }
  }
}
