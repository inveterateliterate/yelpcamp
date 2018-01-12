var mongoose = require('mongoose')
var Campground = require('./models/campground')
var Comment = require('./models/comment')

var data = [
	{
		name: 'Clouds Rest',
		image: 'https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg',
		description: "Scratch at the door then walk away. Toilet paper attack claws fluff everywhere meow miao french ciao litterbox purr disappear for four days and return home with an expensive injury; bite the vet but flex claws on the human's belly and purr like a lawnmower. Chirp at birds eat owner's food for make meme, make cute face. Mice wack the mini furry mouse bleghbleghvomit my furball really tie the room together for hate dog. Burrow under covers reward the chosen human with a slow blink ears back wide eyed, brown cats with pink ears make muffins hide when guests come over, or i can haz. Lick sellotape mesmerizing birds lick butt and make a weird face and attempt to leap between furniture but woefully miscalibrate and bellyflop onto the floor; what's your problem? i meant to do that now i shall wash myself intently licks paws mesmerizing birds."
	},
	{
		name: 'Desert Mesa',
		image: 'https://farm3.staticflickr.com/2353/2069978635_2eb8b33cd4.jpg',
		description: "Scratch at the door then walk away. Toilet paper attack claws fluff everywhere meow miao french ciao litterbox purr disappear for four days and return home with an expensive injury; bite the vet but flex claws on the human's belly and purr like a lawnmower. Chirp at birds eat owner's food for make meme, make cute face. Mice wack the mini furry mouse bleghbleghvomit my furball really tie the room together for hate dog. Burrow under covers reward the chosen human with a slow blink ears back wide eyed, brown cats with pink ears make muffins hide when guests come over, or i can haz. Lick sellotape mesmerizing birds lick butt and make a weird face and attempt to leap between furniture but woefully miscalibrate and bellyflop onto the floor; what's your problem? i meant to do that now i shall wash myself intently licks paws mesmerizing birds."
	},
	{
		name: 'Canyon Floor',
		image: 'https://farm8.staticflickr.com/7258/7121861565_3f4957acb1.jpg',
		description: "Scratch at the door then walk away. Toilet paper attack claws fluff everywhere meow miao french ciao litterbox purr disappear for four days and return home with an expensive injury; bite the vet but flex claws on the human's belly and purr like a lawnmower. Chirp at birds eat owner's food for make meme, make cute face. Mice wack the mini furry mouse bleghbleghvomit my furball really tie the room together for hate dog. Burrow under covers reward the chosen human with a slow blink ears back wide eyed, brown cats with pink ears make muffins hide when guests come over, or i can haz. Lick sellotape mesmerizing birds lick butt and make a weird face and attempt to leap between furniture but woefully miscalibrate and bellyflop onto the floor; what's your problem? i meant to do that now i shall wash myself intently licks paws mesmerizing birds."
	}
]

function seedDB(){
	// Remove all campgrounds
	Campground.remove({}, function(err){
		if(err){
			console.log(err)
		}
		console.log('removed all campgrounds')
	
		// Add a few campgrounds
		data.forEach(function(seed){
		Campground.create(seed, function(err, campground){
			if(err){
				console.log(err)
			}
			else {
				console.log('created a new campground')
				// Add comments
				Comment.create(
					{ 
						text: 'Love this place',
						author: 'John Smith'
				  }, function(err, comment) {
				  	if(err) {
				  		console.log(err)
				  	}
				  	else {
				  		campground.comments.push(comment)
				  		campground.save()
				  		console.log('created a new comment')
				  	}
				  }
				)
			}
		})
	})
	})
}

// create a bunch of comments


module.exports = seedDB