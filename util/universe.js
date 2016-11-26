/*

ran with mongo ds029446.mlab.com:29446/clublife-db universe.js -u club -p

universe.js

"If you wish to make an apple pie from scratch, you must first invent the
    universe." - Carl Sagan

*/

/* get existing clubs
    "You can't wait for inspiration. You have to go after it with a club."
        - Jack London
*/
var acm = db.organizations.findOne({
    "name": "UA Association for Computing Machinery"});
var abxy = db.organizations.findOne({
    "name": "ABXY Gaming Network"});
var crimsonKindness = db.organizations.findOne({
    "name": "Crimson Kindness"});
var smash = db.organizations.findOne({
    "name": "Crimson Smash Club"});

var orgIdAsString = function(orgDoc) {
    return orgDoc._id.toString().split("\"")[1];
};

/* insert users -
    "This job of playing God is a little too big for me.
        Nevertheless, someone has to do it, so I'll try my best to fake it."
    - Larry Wall

    NB Sasha and Brandon (and test account "a@a") already exist
*/
db.users.insert([{
    "username": "jamerklin@crimson.ua.edu",
    "name": "Jonathan Merklin",
    "password": "seriouslyBrandonWhyIsThisPlaintext",
    "salt": 1337,
    "clubs": [
        orgIdAsString(smash),
        orgIdAsString(abxy)
    ]
}, {
    "username": "jzarobsky@crimson.ua.edu",
    "name": "Jake Zarobsky",
    "password": "bren",
    "salt": 4,
    "clubs": [
        orgIdAsString(acm)
    ]
}, {
    "username": "zababka@crimson.ua.edu",
    "name": "Zachary Babka",
    "password": "akbab",
    "salt": 9001,
    "clubs": [
        orgIdAsString(abxy),
        orgIdAsString(smash),
        orgIdAsString(acm)
    ]
}, {
    "username": "tmeyers@crimson.ua.edu",
    "name": "Tucker Meyers",
    "password": "tucker?ihardlyknowher",
    "salt": 7,
    "clubs": []
}, {
    "username": "gray@cs.ua.edu",
    "name": "Jeff Gray",
    "password": "metamodelinglanguage",
    "salt": 404,
    "clubs": []
}, {
    "username": "borie@cs.ua.edu",
    "name": "Richard Borie",
    "password": "ilovecs360",
    "salt": 42,
    "clubs": []
}]);

/* Get the ClubLife team.


... and Jake.

"Jake, we're going to college!" - Finn from Adventure Time
*/

var brandon = db.users.findOne({name: "Brandon Poole"});
var sasha = db.users.findOne({name: "Sasha Hedges"});
var zachary = db.users.findOne({name: "Zachary Babka"});
var merk = db.users.findOne({name: "Jonathan Merklin"});
var jake = db.users.findOne({name: "Jake Zarobsky"});

var userIdAsString = function(userDoc) {
    return userDoc._id.toString().split("\"")[1];
};

/*
    Establish organization memberships

    I'm not even putting a quote here, I'm just going to mention that I'm crazy
        tired and the soundtrack to Initial D is the greatest thing ever and
        it's keeping me conscious and I wish I'd've discovered Eurobeat sooner
*/
db.organizations.update({name: acm.name}, {$set: {
    "url": "/organization/acm", "Vice-President Name": "Matthew Leeds", "Secretary Email": "damccoy1@crimson.ua.edu", "img": "https://images.collegiatelink.net/clink/images/f5b2dc13-7aab-4a95-ab24-adcfa884d90e57a54f72-e5a6-43f1-aa48-942c176ef3b2.png", "Secondary Advisor Email": "", "Organization E-mail": "anderson@cs.ua.edu", "name": "UA Association for Computing Machinery", "Advisor Department": "Computer Science", "Parent Organization": "The SOURCE", "Organization Meeting Day": "Tuesday", "Organization Meeting Location": "SERC 1059", "CleanDayResults": {"Day": 2}, "Secondary Advisor Name &amp; Title": "", "primary contact": "David McCoy", "Advisor Name &amp; Title": "Monica Anderson, Associate Professor", "Secondary Advisor Phone": "", "Organization Meeting Time": "5:15 P.M.", "President Email": "bromano@crimson.ua.edu", "Main Summary": "computer science, computing, computer, computer club, programming, programming competition, gaming, communication, robotics, software, networking, operating system, compiler, algorithm, python, languages, perl, robots, security, hacking, hackers, genius", "Advisor Phone": "(205) 348-1667", "Secondary Advisor Department": "", "Advisor Email": "anderson@cs.ua.edu", "Secretary Name": "David McCoy", "summary": "computer science, computing, computer, computer club, programming, programming competition, gaming, communication, robotics, software, networking, operating system, compiler, algorithm, python, languages, perl, robots, security, hacking, hackers, genius", "About Summary": "The SOURCE", "Vice-President Email": "mwleeds@crimson.ua.edu", "CleanTimeResults": {"Starts": {"Hours": 17, "Minutes": 15}}, "President Name": "Ben Romano", "Treasurer Email": "jazarobsky@crimson.ua.edu",
    "leaders": [userIdAsString(jake)],
    "officers": [userIdAsString(brandon)],
    "members": [userIdAsString(zachary)],
    "posts": [],
    "events": [],
    "pendingRequests": []
}});
db.organizations.update({name: abxy.name}, {$set: {
    "url": "/organization/abxy", "Vice-President Name": "Jonathan Everly", "Secretary Email": "jccrosswhite@crimson.ua.edu", "img": "https://images.collegiatelink.net/clink/images/7809daa4-401a-40e5-8464-6b754412d32bd944857d-47ff-414d-9431-89f034037117.png", "Secondary Advisor Email": "", "Organization E-mail": "abxy@ua.edu", "name": "ABXY Gaming Network", "Advisor Department": "Office of Information Technology", "Parent Organization": "The SOURCE", "Organization Meeting Day": "Tuesdays, Wednesdays, Thursdays, Fridays", "Organization Meeting Location": "Ferguson Center, Riverside Community Center", "CleanDayResults": {"Days": [2, 3, 4, 5]}, "Secondary Advisor Name &amp; Title": "", "primary contact": "Huston Rogers", "Advisor Name &amp; Title": "Brent Springer, Technology Specialist", "Secondary Advisor Phone": "", "Organization Meeting Time": "6:00 PM", "President Email": "cachou@crimson.ua.edu", "Main Summary": "ABXY is the University of Alabama's gaming organization. Our focus is on providing an open environment for people to play video and tabletop games and to meet new people who share interests with them.", "Advisor Phone": "12053487522", "Secondary Advisor Department": "", "Advisor Email": "blspringer@sa.ua.edu", "Secretary Name": "Jim Crosswhite", "summary": "ABXY is the University of Alabama's gaming organization. Our focus is on providing an open environment for people to play video and tabletop games and to meet new people who share interests with them.", "About Summary": "The SOURCE", "Vice-President Email": "jpeverly@crimson.ua.edu", "CleanTimeResults": {"Starts": {"Hours": 18, "Minutes": 0}}, "President Name": "Cosmo Chou", "Treasurer Email": "tdgrant@crimson.ua.edu",
    "leaders": [userIdAsString(merk)],
    "officers": [userIdAsString(brandon)],
    "members": [userIdAsString(zachary)],
    "posts": [],
    "events": [],
    "pendingRequests": []
}});
db.organizations.update({name: crimsonKindness.name}, {$set: {
    "url": "/organization/crimsonkindness", "Vice-President Name": "Malory Goetcheus", "Secretary Email": "mwaskin@crimson.ua.edu", "img": "https://images.collegiatelink.net/clink/images/682f0f73-8a51-4351-be57-6c765cc43b07f8178e3f-cee9-49f2-bde5-ea7167fe87ef.jpg", "Secondary Advisor Email": "", "Organization E-mail": "crimsonkindness@gmail.com", "name": "Crimson Kindness", "Advisor Department": "Consumer Sciences", "Parent Organization": "University of Alabama", "Organization Meeting Day": "Monday", "Organization Meeting Location": "Lloyd 324", "CleanDayResults": {"Day": 1}, "Secondary Advisor Name &amp; Title": "", "primary contact": "Taylor Sheeran", "Advisor Name &amp; Title": "Courtney McGahey, Assistant Professor", "Secondary Advisor Phone": "", "Organization Meeting Time": "7:00", "President Email": "tksheeran@crimson.ua.edu", "Main Summary": "The goal of Crimson Kindness on The University of Alabama campus is to create a community of kindness by engaging the student population in acts of kindness and inspiring kindness in our community.", "Advisor Phone": "205-348-2906", "Secondary Advisor Department": "", "Advisor Email": "cmcgahey@ches.ua.edu", "Secretary Name": "Marley Waskin", "summary": "The goal of Crimson Kindness on The University of Alabama campus is to create a community of kindness by engaging the student population in acts of kindness and inspiring kindness in our community.", "About Summary": "University of Alabama", "Vice-President Email": "mngoetcheus@crimson.ua.edu", "CleanTimeResults": {"Starts": {"Hours": 19, "Minutes": 0}}, "President Name": "Taylor Sheeran", "Treasurer Email": "hwatson1@crimson.ua.edu",
    "leaders": [userIdAsString(sasha)],
    "officers": [userIdAsString(zachary)],
    "members": [],
    "posts": [],
    "events": [],
    "pendingRequests": []
}});
db.organizations.update({name: smash.name}, {$set: {
    "url": "/organization/CrimsonSmashClub", "Vice-President Name": "Bryndon Peacock", "Secretary Email": "Mtrowe@crimson.ua.edu", "img": "https://images.collegiatelink.net/clink/images/c29b4e71-e9e0-4390-a6bb-4b77c5dda3303b17d083-efce-4aea-9e7f-d44a8b3fd2b9.png", "Secondary Advisor Email": "", "Organization E-mail": "CrimsonSmashClub@outlook.com", "name": "Crimson Smash Club", "Advisor Department": "Housing and Residential Communities", "Parent Organization": "University of Alabama", "Organization Meeting Day": "Tuesday, Wednesday, Friday", "Organization Meeting Location": "Tues and Wed: Ferguson Center Lounge; Fri: Riverside Community Center", "CleanDayResults": {"Days": [2, 3, 5]}, "Secondary Advisor Name &amp; Title": "", "primary contact": "Alexandro Tijerina", "Advisor Name &amp; Title": "Maureen Flint, Coordinator of Training and Professional Development", "Secondary Advisor Phone": "", "Organization Meeting Time": "6:00 - 10:00", "President Email": "abtijerina@crimson.ua.edu", "Main Summary": "Crimson Smash Club is your premier source for competitive Super Smash Bros. at the University of Alabama! Whether you're a seasoned pro or want to learn a unique and fast-paced fighting game, join us for weekly gaming sessions and monthly tournaments.", "Advisor Phone": "205-348-9260", "Secondary Advisor Department": "", "Advisor Email": "maflint@sa.ua.edu", "Secretary Name": "Michael Rowe", "summary": "Crimson Smash Club is your premier source for competitive Super Smash Bros. at the University of Alabama! Whether you're a seasoned pro or want to learn a unique and fast-paced fighting game, join us for weekly gaming sessions and monthly tournaments.", "About Summary": "University of Alabama", "Vice-President Email": "bdpeacock@crimson.ua.edu", "CleanTimeResults": {"IntervalStarts": {"Hours": 18, "Minutes": 0}, "IntervalEnds": {"Hours": 22, "Minutes": 0}}, "President Name": "Alexandro Tijerina", "Treasurer Email": "rhkonrad@crimson.ua.edu",
    "leaders": [userIdAsString(merk)],
    "officers": [userIdAsString(brandon)],
    "members": [userIdAsString(zachary)],
    "posts": [],
    "events": [],
    "pendingRequests": []
}});

/* end universe.js
    "The story so far: In the beginning the Universe was created.
        This has made a lot of people very angry and been widely regarded as
        a bad move." - Douglas Adams
*/
