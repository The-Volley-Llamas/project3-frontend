readme.md

# Sportbuddy

## Description

In the mood for a game of football? ⚽️ Ready to dust off your hiking boots? 🌳 Always struggle to find the perfect tennis partner? 🎾[Sportbuddy helps you search for the upcoming events, matches, and court availabilities to suit your desires. [INSERT APP NAME] allows you to search via a specific location, date or just simply see what’s the next upcoming available slot for you to join in!


## User Stories

* 404: As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
* Homepage: As a user I want to be able to see the homepage so I can see what the app is about
* Signup: As an anon I can sign up in the platform so that I can start playing attending events
* Login: As a user I can login to the platform so that I can play my chosen sport/s
* Logout: As a user I can logout from the platform so that no one else can use it
* Add Event As a user I can add an event to host
* Edit Event As a user I can edit an event
* View Events As a user I want to see a list of all upcoming events/slots I can join


## Backlog

List of other features outside of the MVPs scope:

- Google Oauth
- Messaging feature
- Credits/Payment system


## ROUTES: (UPDATE THIS GREEEEEEEEG)

- GET /
  - renders the homepage, where user can choose to search by location or event
- GET /auth/signup
  - redirects to / if user logged in
  - renders the signup form (with flash msg)
- POST /auth/signup
  - redirects to / if user logged in
  - body:
    - username
    - email
    - password
- GET /auth/login
  - redirects to / if user logged in
  - renders the login form (with flash msg)
- POST /auth/login
  - redirects to / if user logged in
  - body:
    - username
    - password
- POST /auth/logout

  - body: (empty)

- GET /events
  - renders the events list + attend function
- POST /event/create-listing
  - redirects to / if user is anonymous
  - body:
    - event name
    - rating/review
- GET /event/:id
  - renders the event detail page
  - includes the list of events, location, price points, attendees
  - add to favourites button & leave rating/create review button
- GET /location/:id/
  - renders the location detail page
  - add to favourites button & leave rating/create review button
  
  - redirects to / if user is anonymous
  - body: (empty - the user is already stored in the session)

## Models

```
User model
{
name: String,
email: String,
password: String,
profileImage: String,
}

Event model
{
sport: String,
location: String,
user: String,
numberOfPlayers: Number,
time: Number,
price: Number,
}

Venue model
{
event: String,
location: String,
rating: Number,
type: String,

```

## Links

### Project planning

[Link to our GitHub project board](https://github.com/orgs/The-Volley-Llamas/projects/1)

### Git

The url to your repository and to your deployed project

[Repository Link](https://github.com/The-Volley-Llamas)

[Deploy Link] (https://sport--buddy.herokuapp.com/)

### Slides

The url to your presentation slides

[Slides Link](https://www.canva.com/design/DAEyn6Wng00/t9C8nX5XeFzYnJSrTDGgCA/view?utm_content=DAEyn6Wng00&utm_campaign=designshare&utm_medium=link&utm_source=sharebutton)

```

```
