# Epitaph

Liven up the logs!

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

Via node:

    var epitaph = require('epitaph');

    var err = console.error;

    console.error = function (err) {
      err(epitaph(err.toString()));
    }

Or the CLI:

    $ npm install -g epitaph
    $ fortune | epitaph

     __________________________________________________
    //                                                 \
    ||                                                 |
    ||                     R.I.P.                      |
    ||                                                 |
    ||   You will be the victim of a bizarre joke.     |
    ||                                                 |
    ||                                                 |
    ||                   ??? - 2014                    |
    ||                                                 |
    ||||||||||||||||||||||||||||||||||||||||||||||||||||

And when something goes wrong:

    // ...
    catch (err) {
      console.error([
        'Once a process,',
        'now departed',
        'Left its author',
        'broken-hearted',
        ''
      ].concat(err.toString()).join('\n'));
    }

### License

[WTFPL](http://www.wtfpl.net/)

