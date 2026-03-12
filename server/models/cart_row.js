module.exports = (sequelize, DataTypes) => {
    // Tabell som skapas
    return sequelize.define("cart_row", {}, {underscored: true});
        
    };
