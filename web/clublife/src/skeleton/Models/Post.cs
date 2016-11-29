using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using System;

namespace skeleton.Models {
  public class Post : IPost {
    [JsonConverter(typeof(ObjectIdConverter))]
    public ObjectId Id { get; set; }
    [BsonElement("subject")]
    public string Subject { get; set; }
    [BsonElement("content")]
    public string Content { get; set; }
    [BsonElement("created")]
    public DateTime Created { get; set; }
    [BsonElement("author")]
    public string Author { get; set; }
    [BsonElement("club")]
    public string Club { get; set; }
  }
}
