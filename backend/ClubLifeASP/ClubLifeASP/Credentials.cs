using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ClubLifeASP {
    public static class Credentials {
        public static MongoCredential mongoCredential = MongoCredential.CreateCredential("database", "user", "pass");
        public static string mongoURL = "url";
        public static int mongoPort = 27017;
    }
}