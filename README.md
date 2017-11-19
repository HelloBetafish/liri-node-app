# liri-node-app

## Overview

LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives the user back data. 

### Commands for CLI

1. `node liri.js my-tweets '<twitterusername>'`

   * This shows the last 20 tweets and when they were created at in your terminal/bash window.
   * Uses the Twitter API

2. `node liri.js spotify-this-song '<song name here>'`

   * This shows the following information about the song in your terminal/bash window
     
     * Artist(s)
     
     * The song's name
     
     * A preview link of the song from Spotify
     
     * The album that the song is from

   * Employs the Spotify API

3. `node liri.js movie-this '<movie name here>'`

   * This will output the following information to your terminal/bash window:

     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```

   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
     
   * Employs the OMDB API. 

4. `node liri.js do-what-it-says`
   
   * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

* In addition to logging the data to your terminal/bash window, it will also output the data to a .txt file called `log.txt`.

## Authors

* **Bethany Pfeister** 

## Acknowledgments

* UA Programming Bootcamp