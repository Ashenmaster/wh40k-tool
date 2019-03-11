const request = require('supertest');
const expect = require('expect');

const app = require('../index');

describe('POST / increment', () => {
	it('should return a 200 when called with options', (done) => {
		request(app)
			.post('/')
			.send({originalValue: 1, modifier: 1})
			.expect(200)
			.end((err, res) => {
				if (err) return done(err);
				done();
			})
	});

	it('should return a 400 when called with no body', (done) => {
		request(app)
			.post('/')
			.expect(400)
			.end((err, res) => {
				if (err) return done(err);
				done();
			})
	});

	it('should return a 400 when called with a string originalValue', (done) => {
		let originalValue = 'abc';
		let modifier = 1;

		request(app)
			.post('/')
			.send({originalValue, modifier})
			.expect(400)
			.end((err, res) => {
				if (err) return done(err);
				done();
			})
	});

	it('should return a 400 when called with a string incremental', (done) => {
		let originalValue = 1;
		let modifier = 'abc';

		request(app)
			.post('/')
			.send({originalValue, modifier})
			.expect(400)
			.end((err, res) => {
				if (err) return done(err);
				done();
			})
	});

	it('should return sum of the originalValue and increment', (done) => {
		let originalValue = 1;
		let modifier = 1;
		let expectedValue = 2;
		request(app)
			.post('/')
			.send({originalValue, modifier})
			.expect(200, {
				newValue: expectedValue
			})
			.end((err, res) => {
				if (err) return done(err);
				done();
			})
	});
});