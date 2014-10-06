/**
* User.js
*
* @description :: Basic user model
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  connection: 'localMysqlServer',
  attributes: {
    firstName: {
      type: 'string'
    },
    lastName: {
      type:'string'
    },
    email: {
      type: 'email'
    },
    provider: {
      type:'string'
    },
    provider_id: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    passports: {
      collection: 'Passport',
      via: 'user'
    }
  }
};

