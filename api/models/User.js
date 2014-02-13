module.exports = {
  tableName: 'users',
  attributes: {
    email: {
      type: 'email',
      unique: true,
      required: true
    },
    password: {
      type: 'STRING',
      required: true,
      minLength: 6
    },
    subscriptions: {
      type: 'ARRAY'
    },

    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },

  beforeCreate: function (attrs, next) {
    var bcrypt = require('bcrypt');

    bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err);

      bcrypt.hash(attrs.password, salt, function(err, hash) {
        if (err) return next(err);

        attrs.password = hash;
        next();
      });
    });
  }
};