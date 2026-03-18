module.exports = (sequelize, DataTypes) => {
    // Tabell som skapas
    return sequelize.define("cart", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        paid: {
            // default false då den inte är betald när den skapas
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }

        
    },
    {underscored: true});
};