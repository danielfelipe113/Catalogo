'use strict';

var app = require('../..');
import request from 'supertest';

var newCatalogo;

describe('Catalogo API:', function() {

  describe('GET /api/catalogos', function() {
    var catalogos;

    beforeEach(function(done) {
      request(app)
        .get('/api/catalogos')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          catalogos = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      catalogos.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/catalogos', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/catalogos')
        .send({
          name: 'New Catalogo',
          info: 'This is the brand new catalogo!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newCatalogo = res.body;
          done();
        });
    });

    it('should respond with the newly created catalogo', function() {
      newCatalogo.name.should.equal('New Catalogo');
      newCatalogo.info.should.equal('This is the brand new catalogo!!!');
    });

  });

  describe('GET /api/catalogos/:id', function() {
    var catalogo;

    beforeEach(function(done) {
      request(app)
        .get('/api/catalogos/' + newCatalogo._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          catalogo = res.body;
          done();
        });
    });

    afterEach(function() {
      catalogo = {};
    });

    it('should respond with the requested catalogo', function() {
      catalogo.name.should.equal('New Catalogo');
      catalogo.info.should.equal('This is the brand new catalogo!!!');
    });

  });

  describe('PUT /api/catalogos/:id', function() {
    var updatedCatalogo;

    beforeEach(function(done) {
      request(app)
        .put('/api/catalogos/' + newCatalogo._id)
        .send({
          name: 'Updated Catalogo',
          info: 'This is the updated catalogo!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCatalogo = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCatalogo = {};
    });

    it('should respond with the updated catalogo', function() {
      updatedCatalogo.name.should.equal('Updated Catalogo');
      updatedCatalogo.info.should.equal('This is the updated catalogo!!!');
    });

  });

  describe('DELETE /api/catalogos/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/catalogos/' + newCatalogo._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when catalogo does not exist', function(done) {
      request(app)
        .delete('/api/catalogos/' + newCatalogo._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
