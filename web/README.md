# API

## Organizations
For these examples ACM (581b77c29534b37d50c51b6c) is used.

### GET All Organizations
    api/organizations

### GET, POST Organization by Id
    api/organizations/581b77c29534b37d50c51b6c

### GET Organizations by Name
Case insensitive and does string contains.

    api/organizations/name?name=japan

### GET Organizations by Tag
Case insensitive and does string contains.

    api/organizations/tag?tag=computer

## Posts

### GET, POST Post by Id
    api/organizations/posts/5824ebbb17b44627c34fa678

### PUT New Post
    api/organizations/posts/newPost?id=581b77c29534b37d50c51b6c

### GET Posts by Organization
    api/organizations/posts?id=581b77c29534b37d50c51b6c

## Events

### GET, POST Event by Id
    api/organizations/events/5824eba317b44627c34fa677

### PUT New Event
    api/organizations/events/newEvent?id=581b77c29534b37d50c51b6c

### GET Events by Organization
    api/organizations/events?id=581b77c29534b37d50c51b6c

### GET Public Events
    api/organizations/publicEvents

## Users

### GET All Users
    api/users

### GET, POST User by Id
    api/users/5824e62917b44627c34fa66e

### GET User by UserName
Case insensitive and does string contains.

    api/users/username?username=bcpoole

### GET User by Name
Case insensitive and does string contains.

    api/users/name?name=brandon

### GET Users In Club by Id
Using ACM (581b77c29534b37d50c51b6c)

    api/users/club?id=581b77c29534b37d50c51b6c

### PUT New User
    api/users/newUser
