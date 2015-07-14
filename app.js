import express from 'express';
import sentiment from 'sentiment';
import Twitter from 'Twitter';
import config from './config';

const app = express();
const port = process.env.PORT || 3000;
const server = from ('http').createServer(app);
const io = from ('socket.io')(server);

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('index.html');
});

/**** Twitter Stream ****/
const TwitterAPI = new Twitter({
  consumer_key: config.TWITTER_CONSUMER_KEY,
  consumer_secret: config.TWITTER_CONSUMER_SECRET,
  access_token_key: config.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: config.TWITTER_ACCESS_TOKEN_SECRET
});

TwitterAPI.stream('statuses/filter', {
  /**** San Francisco coordinates ****/
  locations: '-122.75,36.8, -121.75,37.8' 
}, (stream) => {

  stream.on('data', (data) => {
    let analysis = sentiment(data.text);
    let { score, comparative } = analysis;
    console.log(score, comparative);

    io.emit('tweet', {
      score: score,
      comparative: comparative
    });
  });

  stream.on('error', (error) => {
    console.log(error);
    throw error;
  });
});

server.listen(port, () => {
  var host = server.address().address;
  console.log('app listening at http://%s:%s', host, port);
});
