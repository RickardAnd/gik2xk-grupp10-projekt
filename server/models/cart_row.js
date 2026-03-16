module.exports = (sequelize, DataTypes) => {
    // Tabell som skapas
    return sequelize.define("cart_row", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1 // Standard är 1 tröja
        }
    }, {underscored: true});
        
    };
