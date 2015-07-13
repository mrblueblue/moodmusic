import React from 'react';
import { happyChords } from '../config/music';
import { colors } from '../config/colors';
import createAudioContext from '../utils/createAudioContext';

class App extends React.Component {
  constructor(){
    super();
    this.state = { backgroundColor: '#000000' };
  }

  componentDidMount(){
    let counter = 0;
    let progressionInProgress = false;
    let { generateChord, play, findFrequency, updateChord } = this.props;

    const socket = io('http://localhost:3000');

    socket.on('tweet', (data) => {
      let sentimentScore = data.score;
      this.updateColor(sentimentScore);

      if (counter >= 5){
        generateChord(sentimentScore);
      }

      if (counter < 5){
        let note = happyChords.fMaj[counter];
        counter++;
        play(findFrequency(note));

      } else if (!progressionInProgress){
        progressionInProgress = true;
        updateChord();
      }
    });
  }

  render(){
    let { backgroundColor } = this.state;
    return (
      <div className='app' style={{backgroundColor: backgroundColor}}>
        <div id="logo">
          <img src="./assets/moodmusicBW.png" />
        </div>
        <div className="container">
        <input type="text" autofocus="autofocus" name="tunes" className="tunes" placeholder="Write something with feeling..." />
        </div>
        <footer>
          <p id="attribution">Created by <a href="http://zackfischmann.com">zfisch</a>, <a href="https://github.com/zfisch/moodmusic">view the source</a>.</p>
        </footer>
      </div>
    );
  }

  updateColor(sentimentScore){

    let currentSentiment;

    if (sentimentScore <= -5){
      currentSentiment = 0;
    } else if (sentimentScore <= -4){
      currentSentiment = 1;
    } else if (sentimentScore <= -3){
      currentSentiment = 2;
    } else if (sentimentScore <= -2){
      currentSentiment = 3;
    } else if (sentimentScore <= -1){
      currentSentiment = 4;
    } else if (sentimentScore === 0){
      currentSentiment = 5;
    } else if (sentimentScore <= 1){
      currentSentiment = 6;
    } else if (sentimentScore <= 2){
      currentSentiment = 7;
    } else if (sentimentScore <= 3){
      currentSentiment = 8;
    } else if (sentimentScore <= 4){
      currentSentiment = 9;
    } else if (sentimentScore > 5){
      currentSentiment = 10;
    }

    this.setState({backgroundColor: colors[currentSentiment]});
  }
}

export const MoodMusic = createAudioContext(App);
