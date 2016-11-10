'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

      return queryInterface.bulkInsert('todos', [
       {
        task_name: 'Make a sandwich',
        completed: '0'
      },
      {
        task_name: 'Read docs on Mocha',
        completed: '0'
      }, 
      {
        task_name: 'Finish Nightmare assignments',
        completed: '0'
      },
      {
        task_name: 'Leave it to Beaver',
        completed: '0'
      },
      {
        task_name: 'Practice Javacript',
        completed: '0'
      }], {});
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('todos', null, {});
   
  }
};
