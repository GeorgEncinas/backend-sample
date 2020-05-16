const Sequelize = require('sequelize')

// const db  = require('../../config/mysequelize')

const fields = {
    id_inscription: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    year:{
        type: Sequelize.INTEGER,
    },
    id_student: {
        type: Sequelize.INTEGER,
        references: {
            model: 'student', // Can be both a string representing the table name or a Sequelize model
            key: 'id_student'
        }
    },
    id_course: {
        type: Sequelize.INTEGER,
        references: {
            model: 'course', // Can be both a string representing the table name or a Sequelize model
            key: 'id_course'
          }
    }

};

const options = { tableName: 'inscription' };

function getModel(Sequelize) {
    return Sequelize.define('Inscription', fields, options);
}

export default getModel



