/**
* User.js
*
* @description :: Basic user model
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var bcrypt = require('bcrypt');

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
  },

  beforeCreate: function(user, cb) {
      bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(user.password, salt, function(err, hash) {
              if(err) {
                  console.log(err);
                  cb(err);
              } else {
                  user.password = hash;
                  cb(null, user);
              }
          });
      });
  },

  toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
  }
};

