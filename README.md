# Mood Music
###Turn your mood into music.

Mood Music uses the excellent [Sentiment Library](https://github.com/thisandagain/sentiment) by Anrew Sliwinski and the Web Audio API to generate music and color based on the Twitter stream.

### Running Locally

To get started, you must first register your own Twitter application and create a `config.js` with your API keys. See `config.example.js` for more details.

After having set up your API keys, you can grab the needed dependencies:

    npm install

And then serve the application:

    node app.js
  
Go to `127.0.0.1:3000` in your browser to see the app in action!

