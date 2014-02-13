/**
 * UserController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var bcrypt = require('bcrypt'),
    _ = require('lodash');

module.exports = {
    
  
  /**
   * Action blueprints:
   *    `/user/make`
   */
   make: function (req, res) {
    
    User.findOneByEmail(req.param('email')).done(function (err, user) {
      if (err) {
        console.log(err);
        return res.json({}, 500);
      }

      if (user) {
        bcrypt.compare(req.param('password'), user.password, function (err, match) {
          if (err) {
            console.log(err);
            return res.json({}, 500);
          }

          if (match) {
            req.session.user = user.id;
            res.json(user);
          } else {
            res.json({}, 400);
          }
        });
      } else {
        User.create({
          email: req.param('email'),
          password: req.param('password'),
          subscriptions: []
        }).done(function(err, user) {
          if (err) {
            console.log(err);
            return res.json(err, 400);
          } else {
            res.json(user);
          }
        });
      }
    });
  },


  /**
   * Action blueprints:
   *    `/user/save`
   */
   save: function (req, res) {
    if (!req.session.user) {
      return res.json({}, 403);
    }

    if (_.isString(req.param('subscriptions'))) {
      subs = [req.param('subscriptions')];
    } else {
      subs = _.toArray(req.param('subscriptions'));
    }

    subs = subs.filter(function (sub) {
      return sub.match(/^[a-z0-9]{24}$/);
    });

    User.findOne(req.session.user).done(function (err, user) {
      if (err || !user) {
        console.log(err);
        return res.json({}, 500);
      }

      user.subscriptions = subs;
      user.save(function (err) {
        if (err) {
          return res.json({}, 500);
        }

        return res.json(user);
      });
    });
  },




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserController)
   */
  _config: {}

  
};
