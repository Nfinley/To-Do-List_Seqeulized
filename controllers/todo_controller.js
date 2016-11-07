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
            return models.Todo.findAll()
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

// this route tasks the users task that was just entered on the page
router.post('/create', function(req, res) {
    return sequelizeConnection.sync()
        .then(function() {
            models.Todo.create({
                task_name: req.body.name,
                completed: '0'
            });

            return res.redirect('/');
        })

});

// this route deletes the task 
router.delete('/delete/:id', function(req, res) {
    return sequelizeConnection.sync()
    .then(function() {
        models.Todo.destroy({
            where: {
                id: req.params.id,
            }
        });

        return res.redirect('/');
    })
});


// this route takes the todo task and puts it in the completed section
router.put('/update/:id', function(req, res) {
    return sequelizeConnection.sync()
 //    .then(function(){

	// 	return models.user.create(
	// 	{
	// 		userName:req.body.customer,

	// 	})
	// })

	// .then(function(user){

	// 	return models.Todo.findOne({
	// 		where: {
	// 			id:req.params.id
	// 		}
	// 	})
	// 	.then(function(aTask){
	// 		return user.setTodo(aTask);
	// 	})

	// })
    // this takes in the id of the task and then when pushed to the view will move it to completed
    .then(function() {
        models.Todo.update({
        	completed: '1',
        },
        {
            where: {
                id: req.params.id,
            }
        });

        return res.redirect('/');
    })
})

// The route takes the todo note and puts it back in the todo section
router.put('/move-back/:id', function(req, res) {
    return sequelizeConnection.sync()
    .then(function() {
        models.Todo.update({
        	completed: '0',
        },
        {
            where: {
                id: req.params.id,
            }
        });

        return res.redirect('/');
    })
})



module.exports = router;
