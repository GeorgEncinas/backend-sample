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
    /**
     * ALTER TABLE `sample`.`student` 
     * ADD COLUMN `password` VARCHAR(255) NULL AFTER `email`;
     */
    password:  {
        type: Sequelize.STRING
    },
    image: Sequelize.STRING
};

const options = { tableName: 'student'};

function getModel(Sequelize) {
    Sequelize.literal("select 2+2 as result;")
    return Sequelize.define('Student', fields, options);
}

export default getModel
