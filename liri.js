var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var keys = require('./keys.js');
var fs = require('fs');

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

var userCommand = process.argv[2];
var screenName = 'HelloBetafish';
var songName = "";
var artists = "";
var movieName = "";

switch(userCommand) {
  case "my-tweets":
  tweets();
  break;

  case "spotify-this-song":
  spotifySong();
  break;

  case "movie-this":
  movie();
  break;

  case "do-what-it-says":
  random();
  break;
}

function tweets() {
// Allow user to put in any screenname to pull up another user's tweets.
  if (process.argv[3]) {
  screenName = process.argv[3];
  }

  var params = {screen_name: screenName};

  client.get('statuses/user_timeline', params, function(error, tweets, response) {
  	
  	if (!error) {
  	  for (var i = 0 ; i < tweets.length ; i++) {
  	  	// Limit to 20 Tweets
  	  	if (i === 20) { break;}

  	  	var counter = i + 1;
  	  	// Output Tweets to console
  	  	console.log("--------------------------");
  	  	console.log("Tweet #" + counter + ":");
  	    console.log(tweets[i].text);
  	    console.log("Time Created: " + tweets[i].created_at);
  	    // Write to log.txt
  	    fs.appendFile("log.txt", "--------------------------\r\n" + "Tweet #" + counter + ":" +
  	      tweets[i].text + "\r\nTime Created: " + tweets[i].created_at + "\r\n", function(error) {

  	      if (error){
  	      	return console.log(error);
  	      }
  	    });
  	  }
  	  console.log("--------------------------");
  	}
  	else{
  	  console.log(error);
  	}
  });
}

function spotifySong() {
  // Default song if no input
  if (!process.argv[3]) {
  	songName = "We Are Never Ever Getting Back Together";
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

  	for (var i = 0 ; i < data.tracks.items[0].artists.length ; i++) {
  	  artists += data.tracks.items[0].artists[i].name + " ; ";
  	}
  	// Output song info to console
  	console.log("--------------------------");
  	console.log("Artist(s): " + artists);
  	console.log("Name of Song: " + songName);
  	console.log("Preview URL: " + data.tracks.items[0].preview_url);
  	console.log("Album: " + data.tracks.items[0].album.name);
  	console.log("--------------------------");
  	// Write to log.txt
  	fs.appendFile("log.txt", "--------------------------\r\n" + "Artist(s): " + artists + "\r\nName of Song: " + 
  	  songName + "\r\nPreview URL: " + data.tracks.items[0].preview_url + "\r\nAlbum: " + 
  	  data.tracks.items[0].album.name + "\r\n", function(error) {

  	  if (error) {
  	    return console.log(error);
	  }	
  	});
  });
}

function movie() {
  // Default movie if no input
  if (!process.argv[3]) {
  	movieName = "Mr. Nobody";
  }

  else {
    for (var i = 3 ; i < process.argv.length ; i++){
  	  movieName += process.argv[i] + " ";
  	}
  }

  var queryURL = 'http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&apikey=40e9cece';

  request(queryURL, function(error, response, body) {

  	if(!error && response.statusCode === 200) {
  	  // Look for Rotten Tomatoes Rating if it exists
  	  var RTrating = "";

  	  if (JSON.parse(body).Ratings[1] != undefined) {
  	  	RTrating = JSON.parse(body).Ratings[1].Value;
  	  }

  	  else {
  	  	RTrating = "undefined";
  	  }
  	  // Output movie info to console
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
  	  // Write to log.txt
  	  fs.appendFile("log.txt", "--------------------------\r\n" + "Title: " + JSON.parse(body).Title + "\r\nYear: " + 
  	  	JSON.parse(body).Year + "\r\nIMDB Rating : " + JSON.parse(body).imdbRating + "\r\nRotten Tomatoes Rating: " + 
  	    RTrating + "\r\nCountry: " + JSON.parse(body).Country + "\r\nLanguage: " + JSON.parse(body).Language + 
  	    "\r\nPlot: " + JSON.parse(body).Plot + "\r\nActors: " + JSON.parse(body).Actors + "\r\n", function(error) {

  	    if (error) {
  	      return console.log(error);
	    }	
  	  });
  	}

  	else {
  	  console.log(error);
  	}
  });
}

function random() {

  fs.readFile("random.txt","utf-8", function(error, data) {

  	if (error) {
  	  console.log(error);
  	}

  	var dataArray = data.split(",");
  	userCommand = dataArray[0];
  	process.argv[3] = dataArray[1];

  	if (userCommand === "my-tweets") {
  	  tweets();
  	}

  	else if (userCommand === "spotify-this-song") {
  	  spotifySong();
  	}

  	else if (userCommand === "movie-this") {
  	  movie();
  	}
  });
}