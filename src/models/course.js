const Sequelize = require('sequelize')

// const db  = require('../../config/mysequelize')

const fields =  {
    name: {
        type: Sequelize.STRING
    },
};

const options = { tableName: 'course' };

function getModel(Sequelize) {
    return Sequelize.define('Course', fields, options);
}

export default getModel
