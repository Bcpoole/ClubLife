using MongoDB.Driver;

namespace skeleton
{
    public static class CredentialsTemplate {
        //MongoDB
        public static MongoCredential mongoCredential = MongoCredential.CreateCredential("db", "user", "pw");
        public static string mongoURL = "url";
        public static int mongoPort = 27017;

        //Google
        public static string GoogleClientId = "xxx.apps.googleusercontent.com";
        public static string ClientSecret = "xxx";
  }
}
