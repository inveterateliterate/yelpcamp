var express = require('express'),
	  router = express.Router(), // add all the routes on to router
	  Campground = require('../models/campground'),
	  Comment = require('../models/comment'),
	  middleware = require('../middleware')


// INDEX
router.get('/', function(req, res) {
	Campground.find({}, function(err, campgrounds){
		if(err){
			console.log(err)
		} 
		else {
			res.render('campgrounds/index', { campgrounds: campgrounds })
		}
	})
})


// NEW
router.get('/new', middleware.isLoggedIn, function(req, res) {
	res.render('campgrounds/new')
})


// CREATE
router.post('/', middleware.isLoggedIn, function(req, res) {
	var author = {
		id: req.user._id,
		username: req.user.username
	} // can i do this in comments also?
	var newCampground = {
		name: req.body.name,
		price: req.body.price,
		image: req.body.image,
		description: req.body.description,
		author: author
	} // can use campground[name] and just use req.body.campground
	Campground.create(newCampground, function(err, campground){
		if(err){
			console.log(err)
		}
		else {
			res.redirect('/campgrounds')
		}
	})
})

// SHOW
router.get('/:id', function(req, res){
	// why do i need to find campground again?
	Campground.findById(req.params.id).populate('comments').exec(function(err, campground){
		// don't need to define err because middleware should catch errors
		res.render('campgrounds/show', { campground: campground })
	})
})


// EDIT
router.get('/:id/edit', middleware.checkCampgroundOwnership, function(req, res){
	Campground.findById(req.params.id).populate('comments').exec(function(err, campground){
			res.render('campgrounds/edit', { campground: campground })
	})
})


// UPDATE
router.put('/:id', middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndUpdate(req.params.id, req.body.campground).populate('comments').exec(function(err, campground){
		res.redirect('/campgrounds/' + campground._id)
	})
})


// DESTROY
router.delete('/:id', middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err, campground){
			res.redirect('/campgrounds')
	})
})

module.exports = router