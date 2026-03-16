module.exports = (sequelize, DataTypes) => {
    return sequelize.define('products', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                len: [2, 100]
            }
        },

        body: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        imageUrl: {
            type: DataTypes.STRING(255)
        },

        price: {
            type: DataTypes.DECIMAL(6, 2),
            allowNull: false
        },

        stock: {
            type: DataTypes.INTEGER,
            //allowNull: false
        }

    },
        {underscored: true});
};