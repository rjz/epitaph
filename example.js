var epitaph = require('./index');

var err = console.error;

console.error = function (lines) {

  var opts = {
    before: 2,
    after: Math.floor(Math.random() * 6) + 3,
    padding: Math.floor(Math.random() * 8) + 8,
    date: true
  };

  err(epitaph(lines, opts));
};

console.error('Once a process,\nnow departed\nLeft its author\nbroken-hearted');

