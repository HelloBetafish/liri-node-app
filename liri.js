var Twitter = require('twitter');
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var request = require('request');

// console.log(keys.consumer_key);
var client = new Twitter({
 consumer_key: keys.consumer_key,
 consumer_secret: keys.consumer_secret,
 access_token_key: keys.access_token_key,
 access_token_secret: keys.access_token_secret
});

var movieName = "";
var userCommand = process.argv[2];

if (userCommand === 'my-tweets'){

  // client.get('search/tweets', {q: 'node.js'}, function(error, tweets, response) {
  // 	if (!error) {
  // 	  console.log(tweets);
  // 	}
  // 	else{
  // 	  console.log(error);
  // 	}
  // });

  // var params = {screen_name: 'nodejs'};
  // client.get('statuses/user_timeline', params, function(error, tweets, response) {
  // 	if (!error) {
  // 	  console.log(tweets);
  // 	}
  // 	else{
  // 	  console.log(error);
  // 	}
  // });

  client.get('favorites/list', function(error, tweets, response) {
  	if (error) throw error;
  	// console.log(tweets[0].text);
  	// console.log(tweets);
  	console.log(tweets.length);
  	// console.log(JSON.parse(response));
  });
}

else if (userCommand === 'spotify-this-song'){

}

else if (userCommand === 'movie-this'){
  for (var i = 3 ; i < process.argv.length ; i++){
  	movieName += process.argv[i] + " ";
  }

  var queryURL = 'http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&apikey=40e9cece';
  request(queryURL, function(error, response, body) {
  	if(!error && response.statusCode === 200){
  	  // Look for Rotten Tomatoes Rating if it exists
  	  var RTrating = "";
  	  if (JSON.parse(body).Ratings[1] != undefined){
  	  	RTrating = JSON.parse(body).Ratings[1].Value;
  	  }
  	  else{
  	  	RTrating = "undefined";
  	  }
  	  // Output info about movie
  	  // console.log(body);
  	  console.log("--------------------------");
  	  console.log("Title: " + JSON.parse(body).Title);
  	  console.log("Year: " + JSON.parse(body).Year);
  	  console.log("IMDB Rating : " + JSON.parse(body).imdbRating);
  	  console.log("Rotten Tomatoes Rating: " + RTrating);
  	  console.log("Country: " + JSON.parse(body).Country);
  	  console.log("Language: " + JSON.parse(body).Language);
  	  console.log("Plot: " + JSON.parse(body).Plot);
  	  console.log("Actors: " + JSON.parse(body).Actors);
  	  console.log("--------------------------");
  	}
  	else{
  	  console.log(error);
  	}
  });
}

else if (userCommand === 'do-what-it-says'){

}