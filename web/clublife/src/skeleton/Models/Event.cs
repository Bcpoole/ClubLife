using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace skeleton.Models {
  public class Event : IPost {
    public ObjectId Id { get; set; }
    [BsonElement("subject")]
    public string Subject { get; set; }
    [BsonElement("content")]
    public string Content { get; set; }
    [BsonElement("created")]
    public DateTime Created { get; set; }
    [BsonElement("startTime")]
    public DateTime StartTime { get; set; }
    [BsonElement("endTime")]
    public DateTime EndTime { get; set; }
    [BsonElement("rsvp")]
    public IEnumerable<ObjectId> RSVP { get; set; }
    [BsonElement("isPublic")]
    public bool IsPublic { get; set; }
  }
}
