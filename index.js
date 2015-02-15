var fs = require('fs'),
    path = require('path');

var sprites = require('./lib/sprites');
var ascii = require('./lib/ascii');

var epitaphs = null;

function sample (arr) {
  var i = Math.floor(Math.random() * arr.length);
  return arr[i];
}

function fromEpitaphs () {
  var content;
  if (epitaphs === null) {
    content = fs.readFileSync(path.resolve(__dirname, 'epitaphs'));
    epitaphs = content.toString().split('%\n');
  }

  return sample(epitaphs).split('\n');
}

function grow (width, height) {
  var rows = new Array(height).join('.').split('.');
  return rows.map(function () {
    return '||' + ascii.pad(width, ' ') + '|';
  });
}

function normalizeInscription (inscription) {

  if (!inscription) {
    return fromEpitaphs();
  }
  else if (typeof inscription === 'string') {
    return inscription.split('\n');
  }
  else if (inscription instanceof Buffer) {
    return inscription.toString().split('\n');
  }
  else if (inscription instanceof Error) {
    return inscription.stack.toString().split('\n').map(function (s) {
      return s.substr(0, 50) + '...';
    });
  }

  return null;
}

function drawSprite (spriteName, drawing, offsetX) {
  var sprite = sprites[spriteName];
  var offsetY = drawing.length - sprite.length;
  ascii.blit(sprite, drawing, offsetX, offsetY)
}

function decorate (drawing) {

  var drawingWidth = drawing[0].length;

  var spriteNames = Object.keys(sprites);

  for (var i = 0; i < drawingWidth; i++) {
    drawSprite(sample(spriteNames), drawing, i);
  }

  return drawing;
}

module.exports = function epitaph (inscription, options) {

  var defaults = {
    date: false,
    before: 2,
    after: Math.floor(Math.random() * 6) + 3,
    padding: Math.floor(Math.random() * 8) + 8,
    prefix: ['R.I.P.', ''],
    postfix: ['', '??? - ' + (new Date()).getFullYear()]
  };

  var lines, message, width, opts = {};

  if (!options) options = {};

  for (var key in defaults) {
    opts[key] = options[key] || defaults[key];
  }

  message = normalizeInscription(inscription);

  if (!message) {
    return epitaph(new ReferenceError(fromEpitaphs()), options);
  }

  lines = opts.prefix.concat(message, opts.postfix);

  width = lines.reduce(function (memo, val) {
    return (val.length > memo) ? val.length : memo;
  }, 0) + opts.padding;

  var inscribed = lines.map(function (str) {

    var l = str.replace(/\t/g, '  ');

    var padL = new Array(Math.floor((width - l.length) / 2)).join(' '),
        padR = new Array(width - l.length - padL.length).join(' ');

    return '||' + padL + l + padR + '|';
  });

  var drawing = function (width) {
    var cap = [
      ' _' + ascii.pad(width, '_') + ' ',
      '//' + ascii.pad(width, ' ') + '\\'
    ];

    return cap
      .concat(grow(width, opts.before))
      .concat(inscribed)
      .concat(grow(width, opts.after))
      .map(ascii.stringToArray);
  };

  return decorate(drawing(width)).map(ascii.arrayToString).join('\n');
};

