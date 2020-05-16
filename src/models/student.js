const Sequelize = require('sequelize')

// const db  = require('../../config/mysequelize')

const fields = {
    id_student: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true,
        }
        // allowNull defaults to true
    },
};

const options = { tableName: 'student' };

function getModel(Sequelize) {
    return Sequelize.define('Student', fields, options);
}

export default getModel
