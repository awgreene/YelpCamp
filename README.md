#Yelp Camp
* Add Landing page
* Add campgrounds page that lists all campgrounds

#Each Campground has:
* A name
* An image

#Layout and Basic Styling
* Create our header and footer partials
* Add in Bootstrap

#Creating New Campgours
* Setup new campground POST route
* Add in body-parser
* Setup route to show form
* Add basic unstyled form

#Stlye the NavBar and Form
* Add a navbar to all templates
* Style the new campground form

#Intro to MongoDB
* What is MongoDB
* Why are we using it
* Let's install it

#Our First Mongo Commands
* mongod
* mongo
* help
* show dbs
* use
* insert
* find
* update
* remove

#Mongoose
* What is Mongoose?
* Why are we using it?
* Interact with a Mongo Database using Mongoose

#Add Mongoose
* Install and configure Mongoose
* Setup campground model
* Use campground model inside our routes!

#Show Page
* Review the RESTful routes we've seen so far
* Add description to our campground model
* Show db.collection.drop
* Add a show route/template

#RESTful Routing
* Define REST and explain WHY it matters
* List all 7 RESTful routes
* Show examples of RESTful routing in practice

#Refactor Mongoose Code
* Create a models directory
* Use module.exports
* Require everything correctly

#Add Seeds file
* Add a seed.js file
    * Seeds file resets the db to a predefined initial state
* Run the seeds file everytime the server starts

#Add the Comment model!
* Make errors go away
* Display comments on campground page

#Comment New/Create
* Discuss nested routes
* Add the comment new and create routes
* Add the new comment form

#Style Show Page
* Add sidebar to show page
* Display comments nicely

##Add user model
* Install all packages needed for auth
* Define user model

##Auth pt. 2 - Register
* Configure passport
* Add register routes
* Add register templates

##Auth pt. 3 - Login
* Add login templates
* Add login routes

##Auth pt. 4 - Logout / Navbar
* Add logout route
* Prevent user from adding a comment if not signed in
* Add links to navbar
* Show / hide auth links correctly

##Auth pt. 5 - Show / Hide links
* Show / hide links in the navbar

##Refactor the routes
* Use express router to organize all the routes

##Users + Comments
* Associate users and comments
* Save author's name to a comment automatically

##Users + Campgrounds
* Prevent an unathenticated user from creating a campground
* Save username+id to newly created campground

#Editing Campgrounds
* Add Method-Override
* Add edit route for campgrounds
* Add link to edit page
* Add update route
* Fix $set problem