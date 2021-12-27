module.exports = (sequelize, Sequelize) => {

    const Form = sequelize.define("form", {
        vetName: {
            type: Sequelize.STRING,
        },
        curLocation: {
            type: Sequelize.STRING,
        },
        freqLocation: {
            type: Sequelize.STRING,
        },
        ping: {
            type: Sequelize.STRING,
        },
        behavior: {
            type: Sequelize.STRING,
        },
        resName: {
            type: Sequelize.STRING,
        },
        resContact: {
            type: Sequelize.STRING,
        }
    });
    
    return Form;
    
};