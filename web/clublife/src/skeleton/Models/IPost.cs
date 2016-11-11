﻿using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace skeleton.Models {
  interface IPost {
    ObjectId Id { get; set; }
    string Subject { get; set; }
    string Content { get; set; }
    DateTime Created { get; set; }
  }
}
