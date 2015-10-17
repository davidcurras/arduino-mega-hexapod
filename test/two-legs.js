var five = require("johnny-five"),
  ph = {
    state: "sleep"
  };

var board = new five.Board().on("ready", function() {

  /**
   * This animation controls three servos
   * The servos are the coxa, femur and tibia of a single
   * leg on a hexapod. A full hexapod might need 18
   * servo instances (assuming 3 degrees of freedom)
   */
  ph.coxa1 = new five.Servo({
    pin: 6,
    startAt: 35,
    range: [35, 110]
  });
  ph.femur1 = new five.Servo({
    pin: 5,
    startAt: 50,
    range: [50, 140]
  });
  ph.tibia1 = new five.Servo({
    pin: 3,
    startAt: 10,
    range: [10, 170]
  });

  // Create a Servo.Array for those leg parts
  ph.leg1 = new five.Servo.Array([ph.coxa1, ph.femur1, ph.tibia1]);

  /**
   * This animation controls three servos
   * The servos are the coxa, femur and tibia of a single
   * leg on a hexapod. A full hexapod might need 18
   * servo instances (assuming 3 degrees of freedom)
   */
  ph.coxa2 = new five.Servo({
    pin: 9,
    startAt: 35,
    range: [35, 110]
  });
  ph.femur2 = new five.Servo({
    pin: 10,
    startAt: 50,
    range: [50, 140]
  });
  ph.tibia2 = new five.Servo({
    pin: 11,
    startAt: 10,
    range: [10, 170]
  });

  // Create a Servo.Array for those leg parts
  ph.leg2 = new five.Servo.Array([ph.coxa2, ph.femur2, ph.tibia2]);

  ph.coxas = new five.Servo.Array([ph.coxa1, ph.coxa2]);
  ph.femurs = new five.Servo.Array([ph.femur1, ph.femur2]);
  ph.tibias = new five.Servo.Array([ph.tibia1, ph.tibia2]);

  ph.joints = new five.Servo.Array([ph.coxas, ph.femurs, ph.tibias]);

  ph.legs = new five.Servo.Array([ph.coxa1, ph.femur1, ph.tibia1, ph.coxa2, ph.femur2, ph.tibia2]);

  var legsAnimation = new five.Animation(ph.legs);

  var sleep = {
    duration: 500,
    cuePoints: [0, 0.5, 1.0],
    fps: 100,
    target: ph.joints,
    oncomplete: function() {
      ph.state = 'sleep';
    },
    keyFrames: [
      [null, false, { degrees: 35}],
      [null, { degrees: 70}, { degrees: 50}],
      [null, { degrees: 40}, { step: -30}]
    ]
  };

  var stand = {
    target: ph.joints,
    duration: 500,
    loop: false,
    fps: 100,
    cuePoints: [0, 0.1, 0.3, 0.7, 1.0],
    oncomplete: function() {
      ph.state = 'stand';
    },
    keyFrames: [
      [null, {degrees: 50}, null,                null,                null],
      [null, false,         false,               {degrees: 140 - 26}, {degrees: 140}],
      [null, false,         {degrees: 110 - 13}, false,               {degrees: 110}]
    ]
  };

  // Functions we can call from the REPL
  ph.sleep = function() {
    legAnimation.enqueue(sleep);
  };

  ph.stand = function() {
    legAnimation.enqueue(stand);
  };

  // Inject the `servo` hardware into;
  // the Repl instance's context;
  // allows direct command line access
  board.repl.inject({
    ph: ph
  });

  console.log("Try running ph.stand() or ph.sleep()");

});
