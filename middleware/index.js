var Campground = require('../models/campground'),
		Comment = require('../models/comment')

var middlewareObj = {}


middlewareObj.checkCampgroundOwnership = function(req, res, next){
	// is user logged in
	if(req.isAuthenticated()){
		// find campground
		Campground.findById(req.params.id).populate('comments').exec(function(err, campground){
			if(err){
				req.flash('error', 'Could not find that campground')
				res.redirect('back')
			}
			else {
			// check if campground.author.id eq req.user._id (owns campground)
				if(campground.author.id.equals(req.user.id)) {
					next()	
				}
				else {
					req.flash('error', 'You are not authorized to do that')
					res.redirect('back')
				}
			}
		})
	}
	else {
	// if not logged in flash and redirect
		req.flash('error', 'You need to be logged in')
		res.redirect('back')
	}
}

middlewareObj.checkCommentOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, comment){
			if(err){
				req.flash('error', 'Could not find that comment')
				res.redirect('back')
			}
			else {
				if(comment.author.id.equals(req.user.id)) {
					next()	
				}
				else {
					req.flash('error', 'You are not authorized to do that')
					res.redirect('back')
				}
			}
		})
	}
	else {
		req.flash('error', 'You need to be logged in')
		res.redirect('back')
	}
}

middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next()
	}
	req.flash('error', 'You need to be logged in')
	res.redirect('/login')
}


module.exports = middlewareObj

// can also do 
// module.exports = function(){
	// all the data
// }