var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware");

//root route
router.get("/", function(req, res){
   res.render("landing"); 
});

//register
router.get("/register", function(req, res){
    res.render("register");
});

//sign up logic
router.post("/register", function(req, res){
    var newUser= new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
       if(err){
           console.log(err);
           req.flash("error", err.message + ".");
           return res.render("register");
       } 
       passport.authenticate("local")(req, res, function(){
          req.flash("success", "Welcome to YelpCamp " + user.username);
          res.redirect("/campgrounds"); 
       });
    });
});

//SHOW LOGIN FORM
router.get("/login", function(req, res){
    res.render("login");
});
//LOGIN LOGIC
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds", 
        failureRedirect: "/login"
    }), function(req, res) {
});

//logout route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged out successfully!");
    res.redirect("/campgrounds");
});

//middleware

module.exports = router;