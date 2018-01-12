var mongoose = require('mongoose')

var commentSchema = new mongoose.Schema({
	text: String,
	//  don't want to store all of the user in the author, just the relevant info
	//  can really only do this pattern with a NoSQL db
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		username: String
	},
})

module.exports =  mongoose.model('Comment', commentSchema)