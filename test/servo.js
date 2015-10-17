var five, board, servo;

five = require('johnny-five');

board = new five.Board();

board.on("ready", function() {

  // The servo signal line is connected to
  // Digital PWM Pin 10
  servo = new five.Servo({
    pin: 3,
    startAt: 90
  });

  setTimeout(function() {
    console.log('servo.to( 90 );');
    servo.to( 180 );
  }, 2000);

  setTimeout(function() {
    console.log('servo.to( 0 );');
    servo.to( 0 );
  }, 4000);

  // Inject the `ph` object into
  // the Repl instance's context
  // allows direct command line access
  this.repl.inject({
    servo: servo
  });

});
