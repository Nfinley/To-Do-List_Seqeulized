'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};

// if (config.use_env_variable) {
//   var sequelize = new Sequelize(process.env[config.use_env_variable]);
// } else {
//   var sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

if (process.env.JAWSDB_URL) {
    var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
    var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

//==== NEW TEST SCRIPTS TO GET DB WORKING ON HEROKU =======

// if (!global.hasOwnProperty('db')) {
//     var Sequelize = require('sequelize')
//         , sequelize = null
//
//     if (process.env.HEROKU_POSTGRESQL_BRONZE_URL) {
//         // the application is executed on Heroku ... use the postgres database
//         sequelize = new Sequelize(process.env.HEROKU_POSTGRESQL_BRONZE_URL, {
//             dialect:  'postgres',
//             protocol: 'postgres',
//             port:     match[4],
//             host:     match[3],
//             logging:  true //false
//         })
//     } else {
//         // the application is executed on the local machine ... use mysql
//         sequelize = new Sequelize('example-app-db', 'root', null)
//     }
//
//     global.db = {
//         Sequelize: Sequelize,
//         sequelize: sequelize,
//         User:      sequelize.import(__dirname + '/user')
//         Todo:      sequelize.import(__dirname + '/todo')
//         // add your other models here
//     }
//
// }



fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
