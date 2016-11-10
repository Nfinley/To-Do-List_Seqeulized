/* controller.js file for the To-Do-List-App HW assignment
    Created by: Nigel Finley for the UT BOOTCAMP class
    Date of creation: October 30th, 2016
    Purpose: This is where all of the routes to serve the differenct pages will go
 */

var express = require('express');
var router = express.Router();
var models = require('../models');

var sequelizeConnection = models.sequelize;


/* GET home page. */
router.get('/', function(req, res) {
    return sequelizeConnection.sync()
        .then(function() {
            return models.User.findAll({ include: [models.Todo] })
        })
        .then(function(data) {
            console.log("this is data: ", data);
            var hbsObject = { todo: data };
            // console.log(hbsObject);
            return res.render('index', hbsObject);
        })
        .catch(function(err) {
            console.log(err);
        })
});


// Creates the task
router.post('/create', function(req, res) {
    return sequelizeConnection.sync()
        .then(function() {
            models.User.create({
                Todo: {
                    task_name: req.body.name,
                    completed: '0'
                },
                username: ""
            }, {
                include: [models.Todo]
            });
            return res.redirect('/');
        })
});


// Will move the task from TODO to DONE
router.put('/update/:todoId/:userId/', function(req, res) {
    return sequelizeConnection.sync()


    .then(function() {

            return models.Todo.update({
                completed: '1'
            }, {
                where: {
                    id: req.params.todoId
                }
            })
        })
        .then(function() {
            return models.User.update({
                username: req.body.user
            }, {
                where: {
                    id: req.params.userId
                }
            })
        })
        .then(function() {
            return res.redirect('/');
        })


});

// Allows user to move the task back into the Todo bucket
router.put('/move-back/:todoId/:userId/', function(req, res) {
    return sequelizeConnection.sync()


    .then(function() {

            return models.Todo.update({
                completed: '0'
            }, {
                where: {
                    id: req.params.todoId
                }
            })
        })
        .then(function() {
            return models.User.update({
                username: req.body.user
            }, {
                where: {
                    id: req.params.userId
                }
            })
        })
        .then(function() {
            return res.redirect('/');
        })


});

// Deletes the task from the page and the database
router.delete('/delete/:todoId/:userId/', function(req, res) {

    return sequelizeConnection.sync()

    .then(function() {

            return models.Todo.destroy({
                where: {
                    id: req.params.todoId
                }
            })
        })
        .then(function() {
            return models.User.destroy({
                where: {
                    id: req.params.userId
                }

            })

        })
        .then(function() {
            return res.redirect('/');
        })

});



module.exports = router;
