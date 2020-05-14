import Sequelize from 'sequelize'
import bluebird from "bluebird";



const sequelize = new Sequelize('sample', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

const UserSQL = sequelize.define('User', {
    // attributes
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    name: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    password: {
        type: Sequelize.STRING
        // allowNull defaults to true
    }
}, {
    // options
});


sequelize.sync()

export { Sequelize, UserSQL }