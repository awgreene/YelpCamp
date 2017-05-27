var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    var campgrounds = [
        {
            name : "Salmon Creek",
            image: "https://source.unsplash.com/rU0EP4vdVGY"
        }, {
            name : "Granite Hill",
            image: "https://source.unsplash.com/63Znf38gnXk"
        }, {
            name : "Mountain Goat's Rest",
            image: "https://source.unsplash.com/Aj6mvFNBXAA"
        }
    ];
    res.render("campgrounds", {campgrounds : campgrounds});
})

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The YelpCamp Server has started!");
});