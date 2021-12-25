import Player from '@vimeo/player';
const throttle = require('lodash.throttle');
import storage from './storage';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

const VIDEOPLAYER_KEY = 'videoplayer-current-time';

player.on(
  'timeupdate',
  throttle(({ seconds }) => {
    storage.save(VIDEOPLAYER_KEY, seconds);
  }, 1000),
);

player.setCurrentTime(storage.load(VIDEOPLAYER_KEY));
