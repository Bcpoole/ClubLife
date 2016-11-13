using MongoDB.Bson;
using System;

namespace skeleton.Models {
  interface IPost {
    ObjectId Id { get; set; }
    string Subject { get; set; }
    string Content { get; set; }
    DateTime Created { get; set; }
  }
}
