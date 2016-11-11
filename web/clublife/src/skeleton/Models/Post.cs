﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace skeleton.Models {
  public class Post : IPost {
    public ObjectId Id { get; set; }
    [BsonElement("subject")]
    public string Subject { get; set; }
    [BsonElement("content")]
    public string Content { get; set; }
    [BsonElement("created")]
    public DateTime Created { get; set; }
  }
}
