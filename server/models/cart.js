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
            // Ska vi ha detta?
            type: DataTypes.BOOLEAN
        }

        
    },
    {underscored: true});
};