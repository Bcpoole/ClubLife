using System.Collections.Generic; 
using skeleton.Models;

namespace skeleton.Data
{
    public interface IOrganizationsRepository
    {
        IEnumerable<Organization> GetAllOrganizations();
        Organization GetOrganizationById(string id);
        IEnumerable<Organization> FindOrganizationByName(string name);
        IEnumerable<Organization> FindOrganizationByDayAndTime(string day, string time = null);
        IEnumerable<Organization> FindOrganizationByTag(string tag);
    }
}