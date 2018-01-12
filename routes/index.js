var express = require('express'),
	  router = express.Router(),
		passport = require('passport'),
		User = require('../models/user'),
		localStrategy = require('passport-local'),
		passportLocalMongoose = require('passport-local-mongoose')

// ROOT

router.get('/', function(req, res) {
	res.render('landing')
})


// ==================
// USER (AUTH) ROUTES
// ==================

router.get('/register', function(req, res){
	res.render('register')
})


router.post('/register', function(req, res){
	var newUser = new User({username: req.body.username})
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			return res.render('register', { 'error': err.message })
		}
		else {
			passport.authenticate('local')(req, res, function(){
				req.flash('success', 'Successfully created account for YelpCamp')
				res.redirect('/campgrounds')
			})
		}
	})
})


// show login form
router.get('/login', function(req, res){
	res.render('login')
})


// handle user login
router.post('/login', passport.authenticate('local', {
	successRedirect: '/campgrounds',
	failureRedirect: '/login',
	successFlash: 'Welcome back'
}), function(req, res){
})


// logout
router.get('/logout', function(req, res){
	req.logout()
	req.flash('success', 'You are now signed out')
	res.redirect('/campgrounds')
})

module.exports = router