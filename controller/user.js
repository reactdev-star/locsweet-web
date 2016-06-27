var mongoose = require('sequelize');
var models = require("../models");

exports.save = function(req, res) {

  models.User.create(req.body).then(function(){
    res.json({
      "status" : 200
    });
  })
  // models.User.create({
  //   username: req.body.username,
  //   email: req.body.email,
  //   ad : req.body.ad
  // }).then(function() {
  //   res.json({
  //     success: true,
  //     data: 'Kayıt Eklendi.'
  //   });
  // });

};

exports.list = function(req, res) {
  //res.render('home')
  User.find({}).sort({createDate: -1}).exec(function(err, users) {
    if (err) {
      console.error('Error occurred while listing users: ', err);
      res.json({
        success: false,
        data: 'Error occurred while listing users'
      })
    } else {
      res.json({
        success: true,
        data: users
      })
    }
  });
};

exports.get = function(req, res) {
  User.findOne({_id: req.params.id}, function(err, user) {
    if (err) {
      console.error('Error occurred while getting user: ', err);
      res.json({
        success: false,
        data: user
      })
    } else {
      if (user) {
        res.json({
          success: true,
          data: user
        })
      } else {
        res.status(404).json({
          success: false,
          data: "User not found"
        })
      }
    }
  });
};

exports.delete = function(req, res) {
  User.findOneAndRemove({_id: req.params.id}, function(err) {
    if (err) {
      console.error('Error occurred while deleting user: ', err);
      res.json({
        success: false,
        data: 'Error occurred while deleting user'
      });
    } else {
      res.json({
        success: true,
        data: 'User deleted successfully'
      });
    }
  });
};

exports.update = function(req, res) {
  User.findOne({_id: req.params.id}, function(err, user) {
    if (err) {
      console.error('Error occurred while getting user for update: ', err);
      res.json({
        success: false,
        data: 'Error occurred while getting user for update'
      });
    } else {
      if (!user) {
        res.json({
          success: false,
          data: 'User not found'
        });
      } else {
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;

        user.save(function(err, usr) {
          if (err) {
            console.error('Error occurred while updating user: ', err);
            res.json({
              success: false,
              data: 'Error occurred while updating user'
            });
          } else {
            res.json({
              success: true,
              data: 'User successfully updated',
            });
          }
        });
      }
    }
  })
};
