const Sequelize = require('sequelize')

// const db  = require('../../config/mysequelize')

const fields = {
    year:{
        type: Sequelize.INTEGER,
    },
};

const options = { tableName: 'inscription' };

function getModel(Sequelize) {
    return Sequelize.define('Inscription', fields, options);
}

export default getModel
