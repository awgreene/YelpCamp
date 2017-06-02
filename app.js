var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment"),
    SeedDB     = require("./seeds");
SeedDB();
    
    
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine", "ejs");
    
mongoose.connect("mongodb://localhost/yelp_camp");

// Campground.create(
//     {
//         name: "Granite Hill",
//         image: "https://source.unsplash.com/random",
//         description: "This is a huge granite hill, no bathrooms. No water. just beautiful granite!"
//     });

app.get("/", function(req, res) {
    res.render("landing");
});

// INDEX - Show all campgrounds
app.get("/campgrounds", function(req, res) {
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
app.post("/campgrounds", function(req, res) {
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    
    Campground.create(newCampground, function(err, campground) {
        if(err) {
            console.log(err);
        } else {
            // redirect back to campgrounds page
            res.redirect("campgrounds");
        }
    });
});

// NEW - Show form to create a new campground
app.get("/campgrounds/new", function(req, res){
   res.render("campgrounds/new"); 
});
// ========================
// COMMENTS ROUTE
// ========================
app.get("/campgrounds/:id/comments/new", function(req, res) {
    Campground.findById(req.params.id, function(err, campground){
        if(err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments", function(req, res) {
    // Lookup campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds")
        } else {
            // Create a new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

// SHOW - Show more info about a single campground 
app.get("/campgrounds/:id", function(req, res) {
    //res.send("This will be the show page some day");
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground:foundCampground});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The YelpCamp Server has started!");
});