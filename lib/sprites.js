var ascii = require('./ascii');

var sprites = module.exports = {
  dirt: [
    '.'
  ].map(ascii.stringToArray),

  tallGrass: [
    '|'
  ].map(ascii.stringToArray),

  dandelion: [
    '#',
    '|',
    '|'
  ].map(ascii.stringToArray)
};

