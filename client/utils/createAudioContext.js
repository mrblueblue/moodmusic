import React from 'react';
import { happyChords, frequencies, sadChords } from '../config/music';

export default function createAudioContext(Component){

  const ContextClass = ( window.AudioContext ||
    window.webkitAudioContext ||
    window.mozAudioContext ||
    window.oAudioContext ||
    window.msAudioContext );

  const Context = new ContextClass();

  let pan = 1;

  class AudioContext extends React.Component {
    constructor(){
      super();
      this.state = {
        nowPlaying: [],
        chordQueue: [happyChords.cMaj],
        chordProgression: []
      };
    }

    render() {
      console.log(Component, '*******')
      return (
        <div>
        <Component
          {...this.props}
          {...this.state}
          play={this.play.bind(this)}
          generateChord={this.generateChord.bind(this)}
          updateChord={this.updateChord.bind(this)}
          findFrequency={this.findFrequency.bind(this)}
        />
        </div>
      );
    }

    play(freq) {

      let { nowPlaying } = this.state

      let oscillator = Context.createOscillator();
      oscillator.frequency.value = freq;
      oscillator.type = 'sine';

      let compressor = Context.createDynamicsCompressor();
      compressor.threshold.value = -50;
      compressor.knee.value = 30;
      compressor.ratio.value = 12;
      compressor.reduction.value = -20;
      compressor.attack.value = 1;
      compressor.release.value = 0.25;

      let synthDelay = Context.createDelay(5.0);
      synthDelay.delayTime.value = Math.floor(Math.random() * 1);

      let gainNode = Context.createGain();
      gainNode.gain.value = 0.20;

      //Pan is only supported on Firefox and Chrome.
      if (ContextClass === 'AudioContext' || ContextClass === 'mozAudioContext'){
        let panNode = Context.createStereoPanner();
        panNode.pan.value = Math.random() * pan;
        pan = pan * -1;
        oscillator.connect(panNode);
        panNode.connect(synthDelay);
      } else {
        oscillator.connect(synthDelay);
      }

      synthDelay.connect(gainNode);
      gainNode.connect(compressor);
      compressor.connect(Context.destination);
      oscillator.start(0);

      nowPlaying.push(oscillator);
      this.setState({nowPlaying: nowPlaying});
    }

    generateChord(sentimentValue){

      let { chordQueue, chordProgression, nowPlaying } = this.state;

      var happyOrSad = happyChords;
      if (sentimentValue < 0){
        happyOrSad = sadChords;
      }
      var rand = Math.floor(Math.random() * Object.keys(happyOrSad).length);
      var chord = Object.keys(happyOrSad)[rand];
      chordQueue.unshift(happyOrSad[chord]);
      chordProgression.push(happyOrSad[chord]);

      //Keep it at a consistent 4 chord progression
      if (chordProgression.length > 8){
        chordProgression.shift();
      }

      console.log('Now Playing: ', nowPlaying);
      console.log('Chord Queue: ', chordQueue);
      console.log('Chord progression: ', chordProgression);
    }

    updateChord(){

      let { chordQueue, chordProgression, nowPlaying } = this.state;

      setInterval(function(){
        let nextChord;
        if (chordQueue.length > 0){
          nextChord = chordQueue.pop();
        } else {
          nextChord = chordProgression[0];
          chordProgression.push(chordProgression.shift());
        }
        for (var i = 0; i < nowPlaying.length; i++){
          nowPlaying[i].frequency.value = frequencies[nextChord[i]];
        }
      }, 2000);

    }

    findFrequency(note){
      return frequencies[note];
    }
  }
  console.log(Component)
  return AudioContext;
}
