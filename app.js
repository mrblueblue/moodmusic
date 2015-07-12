var express = require('express');
var sentiment = require('sentiment');
var Twitter = require('Twitter');
var config = require('./config');

var app = express();
var port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('index.html');
});

/**** Twitter Stream ****/

var TwitterAPI = new Twitter({
  consumer_key: config.TWITTER_CONSUMER_KEY,
  consumer_secret: config.TWITTER_CONSUMER_SECRET,
  access_token_key: config.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: config.TWITTER_ACCESS_TOKEN_SECRET
});

var SF = { locations: '-122.75,36.8, -121.75,37.8' };

TwitterAPI.stream('statuses/filter', SF, function(stream){
  stream.on('data', function(data){
    var analysis = sentiment(data.text);
    var score = analysis.score;
    var comparative = analysis.comparative;
    console.log(score, comparative);
  });

  stream.on('error', function(error){
    console.log(error)
    throw error;
  });
});

var server = app.listen(port, function () {
  var host = server.address().address;
  console.log('Example app listening at http://%s:%s', host, port);
});