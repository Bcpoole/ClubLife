using MongoDB.Driver;

namespace skeleton
{
    public static class CredentialsTemplate {
        public static MongoCredential mongoCredential = MongoCredential.CreateCredential("db", "user", "pw");
        public static string mongoURL = "url";
        public static int mongoPort = 27017;
    }
}
