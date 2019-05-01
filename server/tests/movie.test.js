const expect                 = require('expect');
const request                = require('supertest');
const {app}                  = require('./../server');

describe('Movie data fetch tests', () => {

    it('should assert that validation fails', (done) => {

        request(app)
            .post('/query')
            .expect(200)
            .end((err, res) => {
                expect(res.body.Success).toEqual(false);
                expect(res.body.message).toEqual("title needs to be sent in the url request");
                done();
            });
    });

    it('should assert that validation passes', (done) => {
        request(app)
            .post('/query')
            .send({"title": "asdasd"})
            .expect(200)
            .end((err, res) => {
                expect(res.body.Success).toEqual(true);
                expect(res.body.titles).toEqual([]);
                done();
            });
    })
});