var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose");
    
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine", "ejs");
    
mongoose.connect("mongodb://localhost/yelp_camp");

// Schema Setup
var campgroundSchema = new mongoose.Schema({
    name:String,
    image:String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "Granite Hill",
//         image: "https://source.unsplash.com/random",
//         description: "This is a huge granite hill, no bathrooms. No water. just beautiful granite!"
//     });

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
   //Get all campgrounds from db
   Campground.find({}, function(err, campgrounds){
       if(err){
           console.log(err);
       } else {
            //Render file
            res.render("index", {campgrounds : campgrounds});
       }
   });
});

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
            res.redirect("/campgrounds");
        }
    });
});

app.get("/campgrounds/new", function(req, res){
   res.render("new.ejs"); 
});

app.get("/campgrounds/:id", function(req, res) {
    //res.send("This will be the show page some day");
    Campground.findById(req.params.id, function(err, foundCampground) {
        if(err) {
            console.log(err);
        } else {
            res.render("show", {campground:foundCampground});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The YelpCamp Server has started!");
});