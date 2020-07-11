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
    image: Sequelize.STRING
};

const options = { tableName: 'student'};

function getModel(Sequelize) {
    Sequelize.literal("select 2+2 as result;")
    return Sequelize.define('Student', fields, options);
}

export default getModel
