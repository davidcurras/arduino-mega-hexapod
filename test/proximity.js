var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
  var proximity = new five.Proximity({
    controller: "HCSR04",
    pin: 7,
    freq: 1000
  });


  //var leds = new five.Leds([3, 4, 5]);

  // proximity.on("data", function() {
  //   console.log(this.cm + "cm", this.in + "in");
  // });

  proximity.on("change", function() {
    
    console.log((this.cm/100).toFixed(2) + "m", this.in + "in");
  });
});