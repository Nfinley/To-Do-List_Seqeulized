'use strict';

var models = require("../models");

module.exports = {
    up: function(queryInterface, Sequelize) {

        return models.Todo.bulkCreate([{
            task_name: "Wash Clothes",
            completed: '0'
        }, {
            task_name: "Clean Kitchen",
            completed: '0'
        }, {
            task_name: "Record Favorite TV Show",
            completed: '0'
        }, {
            task_name: "Fix Kitchen Door",
            completed: '0'
        }, {
            task_name: "Smile",
            completed: '0'
        }
        ]);

    },

        down: function(queryInterface, Sequelize) {
        var removeList = [
            "Wash Clothes",
            "Clean Kitchen",
            "Record Favorite TV Show",
            "Fix Kitchen Door",
            "Smile"
        ];

        return models.Todo.max('id')
            .then(function(results) {

                return models.Todo.destroy({ where: { task_name: removeList } })
                    .then(function(recordsDeleted) {

                        var newKey = results - (recordsDeleted - 1);

                        var sequelize = new Sequelize('todoList_db', 'root', '', { dialect: 'mysql' });
                        return sequelize.query('ALTER TABLE Todos AUTO_INCREMENT = ' + newKey);
                    })
            })

    }


};
