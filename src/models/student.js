const Sequelize = require('sequelize')

const db  = require('../../config/mysequelize')

const StudentSQL = db.define('Student', {
    id_student: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
    }
}, {
    //options
});

//StudentSQL.sync({force:true})

StudentSQL.sync().then(()=>{
    return StudentSQL.create({
        name: 'Alvaro'
    }) 
})



