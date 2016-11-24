using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;

namespace skeleton.Models {
  [BsonIgnoreExtraElements]
  public class User {
    [JsonConverter(typeof(ObjectIdConverter))]
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
