var Twitter = require('twitter');
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var request = require('request');

var client = new Twitter({
 consumer_key: keys.consumer_key,
 consumer_secret: keys.consumer_secret,
 access_token_key: keys.access_token_key,
 access_token_secret: keys.access_token_secret
});

var screenName = 'HelloBetafish';
var movieName = "";
var userCommand = process.argv[2];

if (userCommand === 'my-tweets'){
// Allow user to put in any screenname to pull up another user's tweets.
  if (process.argv[3]){
  screenName = process.argv[3];
  }

  var params = {screen_name: screenName};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
  	if (!error) {
  	  for (var i = 0 ; i < tweets.length ; i++){
  	  	if (i === 20) { break;}
  	  	var counter = i + 1;
  	  	console.log("--------------------------");
  	  	console.log("Tweet #" + counter + ":");
  	    console.log(tweets[i].text);
  	    console.log("Time Created: " + tweets[i].created_at);
  	  }
  	  console.log("--------------------------");
  	}
  	else{
  	  console.log(error);
  	}
  });
}

else if (userCommand === 'spotify-this-song'){
  for (var i = 3 ; i < process.argv.length ; i++){
  	songName += process.argv[i] + " ";
  }

}

else if (userCommand === 'movie-this'){
  if (!process.argv[3]){
  	movieName = "Mr. Nobody";
  }
  
  else{
  	for (var i = 3 ; i < process.argv.length ; i++){
  	  movieName += process.argv[i] + " ";
  	}
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