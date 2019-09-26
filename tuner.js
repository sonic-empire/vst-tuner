const maxApi = require("max-api");
const express = require("express");
const bodyParser = require('body-parser');

const getRandom = () => {
  return Math.round(Math.random() * 100)
};

maxApi.addHandler('tweak', () => {
	const rand = getRandom();
    maxApi.post('Set to', rand);
    maxApi.outlet(rand)
});

const routes = (app) => {
	app.post('/knob1', function (req, res) {
		maxApi.post("REC knob1", req.body.value);
		if (req.body.value != null) {
			maxApi.outlet(req.body.value);
		}
		res.json({success: true})
	});
};

const boot = () => {
	const app = express();
	app.use(bodyParser.json());
	routes(app)
	app.listen(3200)
	maxApi.post('Listening on', 3200);
};

boot();


// https://www.youtube.com/watch?v=QuIcEHJSwz8
// https://www.youtube.com/watch?v=hCrc0QgZnQ8
