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
  ph.coxa = new five.Servo({
    pin: 6,
    startAt: 35,
    range: [35, 110]
  });
  ph.femur = new five.Servo({
    pin: 5,
    startAt: 50,
    range: [50, 140]
  });
  ph.tibia = new five.Servo({
    pin: 3,
    startAt: 10,
    range: [10, 170]
  });

  // Create a Servo.Array for those leg parts
  ph.leg = new five.Servo.Array([ph.coxa, ph.femur, ph.tibia]);

  /**
   * Create an Animation(target) object. A newly initialized
   * animation object is essentially an empty queue (array) for
   * animation segments that will run asynchronously.
   * @param {target} A Servo or Servo.Array to be animated
   */
  var legAnimation = new five.Animation(ph.leg);

  /**
   * This object describes an animation segment and is passed into
   * our animation with the enqueue method. The only required
   * property is keyFrames. See the Animation wiki page for a full
   * list of available properties
   */
  var sleep = {
    duration: 500,
    cuePoints: [0, 0.5, 1.0],
    oncomplete: function() {
      ph.state = "sleep";
    },
    keyFrames: [
      [null, false, { degrees: 35, easing: "outCirc" }],
      [null, { degrees: 60, easing: "inOutCirc" }, { degrees: 50, easing: "inOutCirc" }],
      [null, { degrees: 20, easing: "inOutCirc" }, { step: -10, easing: "inOutCirc" }]
    ]
  };

  /**
   * Another animation segment
   */
  var stand = {
    duration: 500,
    loop: false,
    cuePoints: [0, 0.1, 0.3, 0.7, 1.0],
    oncomplete: function() {
      ph.state = "stand";
    },
    keyFrames: [
      [null, { degrees: 50 }],
      [null, false, false, { degrees: 100, easing: "outCirc"}, { degrees: 140, easing: "inCirc"}],
      [null, false, { degrees: 90}, false, { degrees: 110 }]
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
