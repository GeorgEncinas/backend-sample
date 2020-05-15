const Sequelize = require('sequelize')


module.exports  = new Sequelize('sample', 'root', 'mysql123', {
    host: 'localhost',
    dialect: 'mysql'    
});
