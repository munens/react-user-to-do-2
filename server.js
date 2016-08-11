"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const mongojs     = require('mongojs');
const app         = express();
const cors        = require('cors');

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
var maindb = 'testdb12';
var userCollection = mongojs(maindb, ['userdb']);

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

// Home page
// app.get("/", (req, res) => {
//   res.render("index");
// });

app.post('/login', function(req, res){

	console.log(req.body);

    userCollection.userdb.find(function(err, docs){
    	if(err){
    		throw err;
    	}

    	for(var doc in docs){
    		if(req.body.email == docs[doc].email
    			&& req.body.password == docs[doc].password){
    				
    			res.json(docs[doc])
    			
    		} else {

    			//res.send("login information is wrong")
    		}
    	}
    	
    })

})


app.post('/signup', function(req, res){

	console.log(req.body);

	userCollection.userdb.findOne({email: req.body.email }, function(err, user){
		
		if(err){
			return err;

		} else if (user){
			res.json(null)
			return;
		}

	    userCollection.userdb.insert(req.body, function (err, doc) {
	        if(err){
	        	throw err;
	        }

	        res.json(doc);
	    });

	})	

})

app.get('/users', function(req, res){

	userCollection.userdb.find(function(err, docs){
		if(docs){
			res.json(docs)	
		}
	})

})

app.get('/users/:id', function(req, res){

	userCollection.userdb.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, doc){
		if(err){
			throw err;
		}
		
		console.log(doc)
		res.json(doc)
	});
	
});

app.put('/users/:id', function(req, res){

	console.log(req.body)

	userCollection.userdb.update({_id: mongojs.ObjectId(req.params.id)},
		{$set : { tasks: req.body.tasks }}, 
			function(err, doc){
				if(err){
					throw err;
				} else {
					res.json(doc)
				}
		});
		
})



app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
