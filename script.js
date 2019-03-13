const Raspi = require("raspi-io").RaspiIO;
const five = require("johnny-five");
const board = new five.Board({
	io: new Raspi()
});

board.on("ready", () => {
	//set excellent button at pin 7
	buttonExcellent = new five.Button("P1-7");
	//set satisfactory button at pin 9
	buttonSatisfactory = new five.Button("P1-9");
	//set poor button at pin 11
	buttonPoor = new five.Button("P1-11");

	//when excellent button is pressed
	buttonExcellent.on("down", function() {
		console.log("excellent clicked");
	});
	buttonExcellent.on("up", function() {
		console.log("excellent release");
	});
});
