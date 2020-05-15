import Sequelize from 'sequelize'
import bluebird from "bluebird";

import getModelStudent from "./models/student";

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
        type: Sequelize.STRING,
        // allowNull defaults to true
    },
    password: {
        type: Sequelize.STRING
        // allowNull defaults to true
    }
}, {
    // options
});

const StudentSQL = getModelStudent(sequelize)

sequelize.sync({force: true})

export { Sequelize, UserSQL, StudentSQL }