/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/catalogos              ->  index
 * POST    /api/catalogos              ->  create
 * GET     /api/catalogos/:id          ->  show
 * PUT     /api/catalogos/:id          ->  update
 * DELETE  /api/catalogos/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import aws from 'aws-sdk';
import Catalogo from './catalogo.model';

/*
 * Load the S3 information from the environment variables.
 */
  var AWS_ACCESS_KEY = 'AKIAID6M7KG5GQUQ5CDA';
  var AWS_SECRET_KEY = '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';
  var S3_BUCKET = 'catalogobucket-dev';
/*
 *
 */

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

 /*
 * Respond to GET requests to /sign_s3.
 * Upon request, return JSON containing the temporarily-signed S3 request and the
 * anticipated URL of the image.
 */
export function sign_request (req, res) {
  aws.config.update({accessKeyId: AWS_ACCESS_KEY , secretAccessKey: AWS_SECRET_KEY });
  aws.config.update({region: 'us-east-1' , signatureVersion: 'v4' });
  var s3 = new aws.S3(); 
  var s3_params = { 
      Bucket: S3_BUCKET, 
      Key: req.query.file_name, 
      Expires: 60, 
      ContentType: req.query.file_type, 
      ACL: 'public-read-write'
  }; 
  
  s3.getSignedUrl('putObject', s3_params, function(err, data){ 
    if(err){ 
        res.send(err)
        console.log(err); 
    }
    else{ 
      var return_data = {
          signed_request: data,
          url: 'https://' + S3_BUCKET + '.s3.amazonaws.com/'+ req.query.file_name 
        };
      
      res.send(JSON.stringify(return_data));
    }
  })
}
/*
 *
 */


// Gets a list of Catalogos
export function index(req, res) {  
  var pattern = new RegExp(req.query.search, 'i');
  

  Catalogo.find({$or: [{'identificacion.familia': {$regex: pattern} },
                          {'identificacion.genero' : {$regex: pattern} },
                          {'identificacion.epiteto' : {$regex: pattern} },
                          {'identificacion.nombreComun' : {$regex: pattern} }]})
    .limit(req.query.limit)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Catalogo from the DB
export function show(req, res) {
  Catalogo.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Catalogo in the DB
export function create(req, res) {
  Catalogo.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Catalogo in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Catalogo.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Catalogo from the DB
export function destroy(req, res) {
  Catalogo.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
