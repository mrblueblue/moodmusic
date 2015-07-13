import React from 'react';
import { MoodMusic } from './components/App';

// window.addEventListener('touchstart', function() {
//   var buffer = myContext.createBuffer(1, 1, 22050);
//   var source = myContext.createBufferSource();
//   source.buffer = buffer;
//   source.connect(myContext.destination);
//   source.noteOn(0);
// }, false);
// console.log(App)/

console.log(document.getElementById('content'))

React.render(
  <MoodMusic />,
  document.getElementById('content')
);
