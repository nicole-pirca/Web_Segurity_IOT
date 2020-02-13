/**
 * Departamento.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    numeroDepartamento: {
      type: 'number'
    },
    areaDepartamento: {
      type: 'number'
    },
    numberoHabitaciones: {
      type: 'number'
    },
    ocupadoDepartamento: {
      type: 'boolean'
    }
  },

};

