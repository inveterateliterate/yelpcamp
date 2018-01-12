var express = require('express'),
	  router = express.Router({mergeParams: true}),
	  Campground = require('../models/campground'),
		Comment = require('../models/comment'),
		middleware = require('../middleware')


// NEW
router.get('/new', middleware.isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err)
		}
		else {
			res.render('comments/new', { campground: campground })			
		}
	}) 
})

// CREATE
router.post('/', middleware.isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err)
			res.redirect('/campgrounds')
		}
		else{
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err)
				}
				else {
					//  add username and id to comment
					comment.author.id = req.user._id
					comment.author.username = req.user.username
					// save comment
					comment.save()
					campground.comments.push(comment._id)
					campground.save()
					req.flash('success', 'Successfully added a comment')
					res.redirect('/campgrounds/' + campground._id)
				}
			})
		}
	})
})



// EDIT
router.get('/:comment_id/edit', middleware.checkCommentOwnership,  function(req, res){
	Comment.findById(req.params.comment_id, function(err, comment){
		res.render('comments/edit', { comment: comment, campground_id: req.params.id })
	})
})

// UPDATE
router.put('/:comment_id', middleware.checkCommentOwnership, function(req, res){
	console.log(req.params)
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment){
		res.redirect('/campgrounds/' + req.params.id)
	})
})

// DESTROY
router.delete('/:comment_id', middleware.checkCommentOwnership,  function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err, comment){
		req.flash('success', 'Comment successfully deleted')
		res.redirect('/campgrounds/' + req.params.id)
	})
})

module.exports = router