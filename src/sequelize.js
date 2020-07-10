import Sequelize from 'sequelize'
import bluebird from "bluebird";

import getModelStudent from "./models/student";
import getModelCourse from "./models/course";
import getModelInscription from "./models/inscription";

const sequelize = new Sequelize('sample', 'root', 'root', {
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

StudentSQL.belongsToMany(CourseSQL, { through: { model: 'Inscription' }, as: 'courses'});
CourseSQL.belongsToMany(StudentSQL, { through: InscriptionSQL, as: 'inscription' });

sequelize.sync()
export { Sequelize, UserSQL, StudentSQL, CourseSQL, InscriptionSQL  }
