module.exports = (sequelize, DataTypes) => {
    // Tabell som skapas
    return sequelize.define("ratings", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },

        rating: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    { underscored: true }
);
};