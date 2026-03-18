module.exports = (sequelize, DataTypes) => {
    // Tabell som skapas
    return sequelize.define("users", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        firstName: {
            type: DataTypes.STRING(50),
            allowNull: false
        },

        lastName: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                len: [3, 50]
            }
        },

        email: {
            type: DataTypes.STRING(200),
            allowNull: false,
            validate:{
                len: [4, 200],
                isEmail: true
            }
        },

        phoneNr: {
            type: DataTypes.STRING(20),
            allowNull: false
        }
        
    },
    {   underscored: true,
        timestamps: true
    });
    
};