'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var catalogoCtrlStub = {
  index: 'catalogoCtrl.index',
  show: 'catalogoCtrl.show',
  create: 'catalogoCtrl.create',
  update: 'catalogoCtrl.update',
  destroy: 'catalogoCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var catalogoIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './catalogo.controller': catalogoCtrlStub
});

describe('Catalogo API Router:', function() {

  it('should return an express router instance', function() {
    catalogoIndex.should.equal(routerStub);
  });

  describe('GET /api/catalogos', function() {

    it('should route to catalogo.controller.index', function() {
      routerStub.get
        .withArgs('/', 'catalogoCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/catalogos/:id', function() {

    it('should route to catalogo.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'catalogoCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/catalogos', function() {

    it('should route to catalogo.controller.create', function() {
      routerStub.post
        .withArgs('/', 'catalogoCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/catalogos/:id', function() {

    it('should route to catalogo.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'catalogoCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/catalogos/:id', function() {

    it('should route to catalogo.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'catalogoCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/catalogos/:id', function() {

    it('should route to catalogo.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'catalogoCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
