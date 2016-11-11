## API
For these examples ACM (id 581b77c29534b37d50c51b6c) is used.

### Get All Organizations
    api/organizations

### Get Organization by Id
    api/organizations/581b77c29534b37d50c51b6c

### Get Organizations by Name
Case insensitive and does string contains

    api/organizations/name?name=japan

### Get Organizations by Tag
Case insensitive and does string contains

    api/organizations/tag?tag=computer

### Get Posts by Organization
    api/organizations/posts?id=581b77c29534b37d50c51b6c

### Get Events by Organization
    api/organizations/events?id=581b77c29534b37d50c51b6c

### Get Public Events
    api/organizations/publicEvents
