const Sequelize = require('sequelize')

const db  = require('../../config/mysequelize')

const CourseSQL = db.define('Course', {
    id_course: {
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
// CourseSQL.sync({force:true})

CourseSQL.sync().then(()=>{
    return CourseSQL.create({
        name: 'Math'
    })
    
})



