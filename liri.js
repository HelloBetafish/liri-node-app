var Twitter = require('twitter');
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var request = require('request');

var client = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret
});

var spotify = new Spotify({
  id: keys.spotifyKeys.id,
  secret: keys.spotifyKeys.secret
});

var screenName = 'HelloBetafish';
var movieName = "";
var songName = "";
var artists = "";
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

else if (userCommand === 'spotify-this-song') {

  if (!process.argv[3]) {
  	songName = "The Sign";
  }

  else {
    for (var i = 3 ; i < process.argv.length ; i++) {
  	  songName += process.argv[i] + " ";
    }
  }
  spotify.search({type: 'track', query: songName, limit: 1}, function(error, data) {
  	if (error) {
  	  return console.log('Error occured: ' + error);
  	}
  	// console.log(data);
  	// console.log(data.tracks.items);
  	for (var i = 0 ; i < data.tracks.items[0].artists.length ; i++){
  	  artists += data.tracks.items[0].artists[i].name + " ; ";
  	}

  	console.log("--------------------------");
  	console.log("# of Artists: " + data.tracks.items[0].artists.length);
  	console.log("Artist(s): " + artists);
  	console.log("Name of Song: " + songName);
  	console.log("Preview URL: " + data.tracks.items[0].preview_url);
  	console.log("Album: " + data.tracks.items[0].album.name);
  	console.log("--------------------------");
  });
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