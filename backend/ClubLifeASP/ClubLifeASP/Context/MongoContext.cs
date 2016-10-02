using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ClubLifeASP.Context {
    public class MongoContext {
        private IMongoDatabase database;

        public MongoContext() {
            var credential = Credentials.mongoCredential;
            var settings = new MongoClientSettings {
                Credentials = new[]
                {
                    credential
                },
                Server = new MongoServerAddress(Credentials.mongoURL, Credentials.mongoPort)
            };

            var client = new MongoClient(settings);

            database = client.GetDatabase("clublife-db");
        }
    }
}