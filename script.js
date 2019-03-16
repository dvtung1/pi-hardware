const Raspi = require("raspi-io").RaspiIO;
const five = require("johnny-five");
const board = new five.Board({
	io: new Raspi()
});
const axios = require("axios");

//deploy temp backend on heroku
const BACKEND_URL = "https://purfectdining-server.herokuapp.com/api/rpi";

board.on("ready", () => {
	//set excellent button at pin 11
	buttonExcellent = new five.Button("P1-11");
	//set satisfactory button at pin 13
	buttonSatisfactory = new five.Button("P1-13");
	//set poor button at pin 15
	buttonPoor = new five.Button("P1-15");

	buttonExcellent.on("down", function() {
		sendRatingBackend("excellent");
	});
	buttonSatisfactory.on("down", function() {
		sendRatingBackend("satisfactory");
	});
	buttonPoor.on("down", function() {
		sendRatingBackend("poor");
	});
	// buttonExcellent.on("up", function() {
	// 	console.log("excellent release");
	// });
});

sendRatingBackend = rating => {
	axios
		.post(BACKEND_URL, { rating: rating })
		.then(res => {
			console.log(rating);
		})
		.catch(err => {
			console.log(err.response.data.message);
		});
};
