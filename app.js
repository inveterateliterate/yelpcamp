var express = require('express'),
		app = express(),
		bodyParser = require('body-parser'),
		mongoose = require('mongoose'),
		flash = require('connect-flash'),
		Campground = require('./models/campground'),
		Comment = require('./models/comment'),
		seedDB = require('./seeds'),
		passport = require('passport'),
		User = require('./models/user'),
		localStrategy = require('passport-local'),
		passportLocalMongoose = require('passport-local-mongoose'),
		methodOverride = require('method-override'),
		expressSanitizer = require('express-sanitizer')

var commentRoutes = require('./routes/comments'),
		campgroundRoutes = require('./routes/campgrounds'),
		authRoutes = require('./routes')

// APP CONFIG
var url = process.env.DATABASEURL || 'mongodb://localhost/yelpcamp'
mongoose.connect(url)

app.use(flash())

// PASSPORT CONFIG
app.use(require('express-session')({
	secret: 'Rusty is the best and cutest dog', // used to decode the secret in the session
	resave: false,
	saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use(methodOverride('_method'))
app.use(expressSanitizer())
app.set('view engine', 'ejs')
// seedDB() // seed the db here

//  middleware to pass req.user (currentUser) to every template
app.use(function(req, res, next){
	res.locals.currentUser = req.user
	res.locals.error = req.flash('error')
	res.locals.success = req.flash('success')
	next()
})

// ROUTES
app.use(authRoutes)
app.use('/campgrounds', campgroundRoutes)
app.use('/campgrounds/:id/comments', commentRoutes)


// LISTEN FOR THE SERVER
var host = process.env.PORT || 3000
app.listen(host, process.env.IP, function(){
	console.log('The YelpCamp server has started')
})