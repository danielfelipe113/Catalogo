'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var CatalogoSchema = new mongoose.Schema({

  identificacion: {
    familia: {type: String, required: true},
    genero: {type: String, required: true},
    epiteto: {type: String, required: true},
    autor: {type: String, required: true},
    nombreComun: {type: String, required: false}
  },
  foto: {
    imagenUrl: [{type: String, required: true}],
    creditoFoto: {type: String, required: true}
  },
  descripcion: {type: String, required: false},
  usos: [{type: String, required: false}],
  distribucion: [{
    lat: {type: String, required: false},
    lng: {type: String, required: false}
  }],
  sede: [{type: String, required: true}],
  usuario: {
    nombre: {type: String, required: true},
    id: {type: mongoose.Schema.Types.ObjectId, required: true},
    correo: {type: String, required: true}
  }
});



export default mongoose.model('Catalogo', CatalogoSchema);
