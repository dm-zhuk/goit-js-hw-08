// npm install vimeo-player

import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe, {
  autoplay: true,
  fullscreen: true,
});

// initialize the player and set the `timeupdate` event handler to track the playback time update
player.on('play', function () {
  player.on(
    'timeupdate',
    // apply 1 sec throttle tracking
    throttle(function (data) {
      const currentTime = data.seconds;
      localStorage.setItem('videoplayer-current-time', currentTime);
    }, 1000)
  );
});

// when page reloaded - `setCurrentTime()` method applied
const savedTime = localStorage.getItem('videoplayer-current-time');

if (savedTime) {
  player.on('loaded', function () {
    player
      .setCurrentTime(savedTime)
      .then(function () {
        player.play();
      })
      .catch(function (error) {
        console.error('Error setting current time:', error);
      });
  });
}

console.log(savedTime);
