const Sequelize = require('sequelize')

const db  = require('../../config/mysequelize')

const InscriptionSQL = db.define('Inscription', {
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
            model: 'Students', // Can be both a string representing the table name or a Sequelize model
            key: 'id_student'
        }
    },
    id_course: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Courses', // Can be both a string representing the table name or a Sequelize model
            key: 'id_course'
          }
    }

}, {
    //options
});
// InscriptionSQL.sync({force:true})

InscriptionSQL.sync().then(()=>{
    return InscriptionSQL.create({
        year: 2020,
        id_student: 1,
        id_course: 1,

    })
    
})



