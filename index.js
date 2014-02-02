var fs = require('fs'),
    path = require('path');

var epitaphs = null;

function sample (arr) {
  var i = Math.floor(Math.random() * arr.length);
  return arr[i];
}

function pad (width, padding) {
  return new Array(width).join(padding);
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
    return '||' + pad(width, ' ') + '|';
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
      return s.substr(0, 50) + '...'
    });
  }

  return null;
}

module.exports = function epitaph (inscription, options) {

  var defaults = {
    date: false,
    before: 2,
    after: Math.floor(Math.random() * 6) + 3,
    padding: Math.floor(Math.random() * 8) + 8,
    prefix: ['R.I.P.', ''],
    postfix: ['', '??? - ' + (new Date).getFullYear()]
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

    return '||' + padL + l + padR + '|'
  });

  var drawing = function (width) {
    var cap = [
      ' _' + pad(width, '_') + ' ',
      '//' + pad(width, ' ') + '\\'
    ];

    return cap
      .concat(grow(width, opts.before))
      .concat(inscribed)
      .concat(grow(width, opts.after))
      .concat(pad(width + 3, '|'));
  };

  return drawing(width).join('\n');
};

