module.exports = (sequelize, DataTypes) => {
    // Tabell som skapas
    return sequelize.define("ratings", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        rating: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 5
            },
            allowNull: true
        },
        productID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    { underscored: true }
);
};