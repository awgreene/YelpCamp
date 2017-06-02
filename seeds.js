var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");
    
    
var data = [
    {
        name: "Cloud's Rest",
        image: "https://source.unsplash.com/yvruQt6JXjc",
        description: "Check out those clouds!"
    },
    {
        name: "Desert Mesa",
        image: "https://source.unsplash.com/YbrAK2ngf2E",
        description: "Check out that desert!"
    },
    {
        name: "Canyon",
        image: "https://source.unsplash.com/DuDG4egnChs",
        description: "Check out that canyon!"
    }]
    

function seedDB () {
    // Remove all campgrounds
    Campground.remove({}, function(err){
        if(err) {
            console.log(err);
        } else {
            console.log("removed campgrounds")
        }
    });
    
     // Add a few campgrounds
    data.forEach(function(seed){
        Campground.create(seed, function(err, campground) {
            if(err) {
                console.log(err);
            } else {
                console.log("Added a campground");
                
                // Add a comment!
                Comment.create({
                    text: "This place is great, but I wish there was internet",
                    author: "Homer Simpson"
                }, function(err, comment) {
                    if(err) {
                        console.log(err);
                    } else {
                        campground.comments.push(comment);
                        campground.save();
                        console.log("Created a new comment")
                    }
                });
            }
        });
    });
};

module.exports = seedDB;