const Raspi = require("raspi-io").RaspiIO;
const five = require("johnny-five");
const board = new five.Board({
	io: new Raspi()
});
const axios = require("axios");

//deploy temp backend on heroku
const BACKEND_URL = "https://purfectdining-server.herokuapp.com/api/rpi";
//this rpi will be set up at Ford Dining Court
const PLACE = "Ford";

const SONG = {
	song: [
		["C4", 1 / 4],
		["D4", 1 / 4],
		["F4", 1 / 4],
		["D4", 1 / 4],
		["A4", 1 / 4],
		[null, 1 / 4],
		["A4", 1],
		["G4", 1],
		[null, 1 / 2],
		["C4", 1 / 4],
		["D4", 1 / 4],
		["F4", 1 / 4],
		["D4", 1 / 4],
		["G4", 1 / 4],
		[null, 1 / 4],
		["G4", 1],
		["F4", 1],
		[null, 1 / 2]
	],
	tempo: 100
};

board.on("ready", () => {
	//set excellent button at pin 11
	var buttonExcellent = new five.Button("P1-11");
	//set satisfactory button at pin 13
	var buttonSatisfactory = new five.Button("P1-13");
	//set poor button at pin 15
	var buttonPoor = new five.Button("P1-15");

	//var piezo = new five.Piezo("P1-32");
	var piezo = new five.Piezo("P1-23");

	board.repl.inject({
		piezo: piezo
	});
	buttonExcellent.on("down", function() {
		sendRatingBackend("excellent");
		console.log("Sending..");
	});
	buttonSatisfactory.on("down", function() {
		sendRatingBackend("satisfactory");
		console.log("Sending..");
	});
	buttonPoor.on("down", function() {
		sendRatingBackend("poor");
		console.log("Sending..");
	});
	buttonExcellent.on("up", function() {
		piezo.play(SONG);
		wait(1800);
	});
	buttonSatisfactory.on("up", function() {
		piezo.play(SONG);
		wait(1800);
	});
	buttonPoor.on("up", function() {
		piezo.play(SONG);
		wait(1800);
	});
});

var sendRatingBackend = rating => {
	axios
		.post(BACKEND_URL, { rating: rating, place: PLACE })
		.then(res => {
			console.log(rating);
		})
		.catch(err => {
			console.log(err.response.data.message);
		});
};

//hang execution/resource for some ms
function wait(ms) {
	var start = new Date().getTime();
	var end = start;
	while (end < start + ms) {
		end = new Date().getTime();
	}
}
