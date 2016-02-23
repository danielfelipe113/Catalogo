/**
 * Catalogo model events
 */

'use strict';

import {EventEmitter} from 'events';
var Catalogo = require('./catalogo.model');
var CatalogoEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CatalogoEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Catalogo.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    CatalogoEvents.emit(event + ':' + doc._id, doc);
    CatalogoEvents.emit(event, doc);
  }
}

export default CatalogoEvents;
