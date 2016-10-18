using System;
using System.Collections.Generic;
using System.Linq;
using skeleton.Models;
using MongoDB.Driver;

namespace skeleton.Data
{
    public class OrganizationsRepository : IOrganizationsRepository
    {
        private IMongoDatabase database;

        public OrganizationsRepository() {
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

        public IEnumerable<Organization> GetAllOrganizations() {
            return database.GetCollection<Organization>("organizations").AsQueryable();
        }

        public Organization GetOrganizationById(string id) {
            var orgs = GetAllOrganizations();
            return orgs.Where(x => x.Id.ToString() == id).FirstOrDefault();
        }

        public IEnumerable<Organization> FindOrganizationByName(string name) {
            var orgs = GetAllOrganizations();
            return orgs.Where(x => x.name.ToLower().Contains(name.ToLower()));
        }

        //TODO: Make day into an Enumerable
        //TODO: clean up the "Organization Meeting Time" on Mongo then fix this function
        public IEnumerable<Organization> FindOrganizationByDayAndTime(string day, string time = null) {
            var orgs = GetAllOrganizations();

            //Just by day of week
            if (time == null) {
                return orgs.Where(x => x.OrganizationMeetingDay.Contains(day));
            } else { //day and time
                var orgsOnDay = orgs.Where(x => x.OrganizationMeetingDay.Contains(day));
                return orgsOnDay.Where(x => x.OrganizationMeetingTime.Contains(time));
            }
        }

        public IEnumerable<Organization> FindOrganizationByTag(string tag) {
            var orgs = database.GetCollection<Organization>("organizations").AsQueryable().ToList();
            return orgs.Where(x => x.MainSummary.ToLower().Contains(tag.ToLower()));
        }
    }
}
