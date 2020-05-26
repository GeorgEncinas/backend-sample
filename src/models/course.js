const Sequelize = require('sequelize')

// const db  = require('../../config/mysequelize')

const fields =  {
    id_course: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
    },
};

const options = { tableName: 'course' };

function getModel(Sequelize) {
    return Sequelize.define('Course', fields, options);
}

export default getModel



