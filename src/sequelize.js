import Sequelize from 'sequelize'
import bluebird from "bluebird";

import getModelStudent from "./models/student";
import getModelCourse from "./models/course";
import getModelInscription from "./models/inscription";

const emitter = require('./index.js')
const sequelize = new Sequelize('sample', 'root', 'rootr', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false,
        underscored: true,
        underscoredAll: true,
    }
});

const UserSQL = sequelize.define('User', {
    // attributes
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    name: {
        type: Sequelize.STRING,
        // allowNull defaults to true
    },
    password: {
        type: Sequelize.STRING
        // allowNull defaults to true
    }
}, {
    // options
});

const StudentSQL = getModelStudent(sequelize)
const CourseSQL = getModelCourse(sequelize)
const InscriptionSQL = getModelInscription(sequelize)

StudentSQL.belongsToMany(CourseSQL, { through: { model: InscriptionSQL }, as: { singular: 'inscription', plural: 'courses'}});
CourseSQL.belongsToMany(StudentSQL, { through: InscriptionSQL, as: 'inscription' });

sequelize.sync().then(()=>{
                emitter.emit('sequelizeReady');
            },(err)=>{
                Console.log('error al cargar la base de datos')
            })
export { Sequelize, UserSQL, StudentSQL, CourseSQL, InscriptionSQL  }
