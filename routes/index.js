var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// ROOT ROUTE
router.get("/", function(req, res) {
    res.render("landing");
});

// REGISTER FORM ROUTE
router.get("/register", function(req, res) {
    res.render("register");
});

// REGISTER ROUTE
router.post("/register", function(req, res){
    var newUser = new User({username:req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            res.render("register");
        } else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/campgrounds");
            });
        }
    });
});

// LOGIN FORM ROUTE
router.get("/login", function(req, res) {
    res.render("login");
});

// LOGIN ROUTE
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"}), function(req, res) {
});


// LOGOUT ROUTE
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
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