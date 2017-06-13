var middlewareObj= {};

var Campground = require("../models/campground"),
    Comment    = require("../models/comment");

middlewareObj.isLoggedIn = function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please login first!");
    res.redirect("/login");
};

middlewareObj.checkCommentOwnership = function checkCommentOwnership(req, res, next) {
    //isLoggedIn
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if(err) {
                res.redirect("back");
            } else {
                if(foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
};

middlewareObj.checkCampgroundOwnership = 
function checkCampgroundOwnership(req, res, next) {
    //isLoggedIn
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground) {
            if(err) {
                res.redirect("back");
            } else {
                if(foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
};

module.exports = middlewareObj;