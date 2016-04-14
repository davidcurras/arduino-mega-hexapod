var five, board, servo;

five = require('johnny-five');

board = new five.Board();

board.on("ready", function() {

  // The servo signal line is connected to
  // Digital PWM Pin 10
  servo = new five.Servo({
    pin: 8,
    startAt: 90
  });

  // Inject the `ph` object into
  // the Repl instance's context
  // allows direct command line access
  this.repl.inject({
    servo: servo
  });

});
