const express = require('express');
const addRequestID = require('express-request-id');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const status = require('./status');

let app = express();
// Function to set the logging level based on environment
// TODO: Expand this to use a debugging env var
function setLogging(environment) {
	app.use(addRequestID());
	morgan.token('id', function getId (req) {
		return req.id;
	});

	let loggerFormat = ':id [:date[web]]" :method :url" :status :response-time;';
	if(environment === 'dev' || environment === 'test') {
		app.use(morgan(loggerFormat, {
			stream: process.stderr
		}));
	} else {
		app.use(morgan('combined', {
			skip: function (req, res) {
				return res.statusCode < 400;
			}
		}));
	}
}

setLogging(process.env.ENVIRONMENT);

app.use(bodyParser.json());

function validateInput(value) {
	return typeof value == 'number';
}

function increment(originalValue, incremental) {
	return originalValue + incremental;
}

function reduction(originalValue, modifier) {
	let newModifier = Math.abs(modifier);
	return originalValue - newModifier;
}

app.get('/status', (req, res) => {
	res.json(status);
});

app.post('/', (req, res) => {
	let originalValue = req.body.originalValue;
	let modifier = req.body.modifier;

	if (validateInput(originalValue) && validateInput(modifier)) {
		if (Math.sign(modifier) === 1) {
			let newValue = increment(originalValue, modifier);
			res.send(
				{
					newValue
				}
			);

		} else if (Math.sign(modifier) === -1) {
			let newValue = reduction(originalValue, modifier);
			res.send(
				{
					newValue
				}
			);
		}
	} else {
		res.sendStatus(400);

	}


});

app.listen(3000);

module.exports = app;