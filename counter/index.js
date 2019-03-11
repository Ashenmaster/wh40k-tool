const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const status = require('./status');

let app = express();

app.use(morgan('combined', {
	skip: function (req, res) {
		return res.statusCode < 400
	}
}));
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