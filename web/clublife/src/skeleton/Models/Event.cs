﻿using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace skeleton.Models {
  public class Event : IPost {
    [JsonConverter(typeof(ObjectIdConverter))]
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
    public IList<string> RSVP { get; set; }
    [BsonElement("isPublic")]
    public bool IsPublic { get; set; }
    [BsonElement("author")]
    public string Author { get; set; }
    [BsonElement("club")]
    public string Club { get; set; }
  }
}
