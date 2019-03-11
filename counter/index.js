const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
let app = express();

app.use(morgan('combined', {
	skip: function (req, res) { return res.statusCode < 400 }
}));
app.use(bodyParser.json());

function validateInput(value) {
	return typeof value == 'number';
}

function increment(originalValue, incremental) {
	return originalValue + incremental;
}

app.post('/', (req, res) => {
	let originalValue = req.body.originalValue;
	let incremental = req.body.incremental;

	if (validateInput(originalValue) && validateInput(incremental)) {
		let newValue = increment(originalValue, incremental);
		res.send(
			{
				newValue
			}
		);
	} else {
		res.sendStatus(400);
	}


});

app.listen(3000);

module.exports = app;