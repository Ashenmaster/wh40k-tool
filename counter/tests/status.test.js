const request = require('supertest');
const expect = require('expect');

const app = require('../index');

describe('GET /status', () => {
	it('should return a 200 when called with options', (done) => {
		request(app)
			.get('/status')
			.expect(200)
			.end((err, res) => {
				if (err) return done(err);
				done();
			})
	});
});