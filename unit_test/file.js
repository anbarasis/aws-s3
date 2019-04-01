'use strict';
const superTest = require('supertest');
const expect = require('chai').expect;
const api = superTest('http://localhost:8000');

describe('AWS s3 test cases', function () {

    it('s3_list/objects_success', function (done) {
        api.post('/file/list')
        .send({limit :10})
        .end(function (err, res) {     
            if (err) throw err;
            expect(res.body.statusCode).to.equal(200)
            done()
        });
    })
    it('s3_list/objects_failure', function (done) {
        api.post('/file/list')
        .send({limit :"invalidlimit"})
        .end(function (err, res) {   
            if (err) throw err;
            expect(res.body.statusCode).to.equal(200)
            done()
        });
    })
});
