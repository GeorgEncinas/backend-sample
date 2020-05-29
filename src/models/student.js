const Sequelize = require('sequelize')

// const db  = require('../../config/mysequelize')

const fields = {
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true,
        }
    },
};

const options = { tableName: 'student' };

function getModel(Sequelize) {
    return Sequelize.define('Student', fields, options);
}

export default getModel
