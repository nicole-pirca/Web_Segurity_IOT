/**
 * Edificio.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    nombreEdificio: {
      type: 'string'
    },
    direccionEdificio: {
      type: 'string'
    },
    numPisosEdificio: {
      type: 'number'
    },
    ascersorEdificio: {
      type: 'boolean'
    }
  },

};

