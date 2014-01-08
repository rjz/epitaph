# Epitaph

     _________________________
    //                        \
    ||                        |
    ||                        |
    ||        R.I.P.          |
    ||                        |
    ||    Once a process,     |
    ||     now departed       |
    ||    Left its author     |
    ||    broken-hearted      |
    ||                        |
    ||      ??? - 2014        |
    ||                        |
    ||                        |
    ||                        |
    ||                        |
    ||                        |
    |||||||||||||||||||||||||||


### Installation

    $ npm install epitaph

### Usage

    var epitaph = require('epitaph');

    var err = console.error;

    console.error = function (err) {
      err(epitaph(err.toString()));
    }

And when something goes wrong:

    // ...
    catch (e) {
      console.error('Once a process,\nnow departed\nLeft its author\nbroken-hearted');
    }

### License

[WTFPL](http://www.wtfpl.net/)

