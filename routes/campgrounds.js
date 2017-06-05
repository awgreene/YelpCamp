var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

// INDEX - Show all campgrounds
router.get("/", function(req, res) {
   //Get all campgrounds from db
   Campground.find({}, function(err, campgrounds){
       if(err){
           console.log(err);
       } else {
            //Render file
            res.render("campgrounds/index", {campgrounds : campgrounds});
       }
   });
});

// CREATE - Add a new campground to db
router.post("/", isLoggedIn, function(req, res) {
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    
    var desc = req.body.description;
    var author = {
        //Add username and id to campground
        id : req.user._id,
        username : req.user.username
    };
    var newCampground = {name: name, image: image, description: desc, author: author};
    
    Campground.create(newCampground, function(err, campground) {
        if(err) {
            console.log(err);
        } else {
            console.log("New Campground: " + campground);
            // redirect back to campgrounds page
            res.redirect("campgrounds");
        }
    });
});

// NEW - Show form to create a new campground
router.get("/new", isLoggedIn, function(req, res){
   res.render("campgrounds/new"); 
});

// SHOW - Show more info about a single campground 
router.get("/:id", function(req, res) {
    //res.send("This will be the show page some day");
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground:foundCampground});
        }
    });
});

//=============================
// Functions
//=============================
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;