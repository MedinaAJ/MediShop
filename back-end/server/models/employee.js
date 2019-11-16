module.exports = (sequelize, DataTypes) => {
    const employee = sequelize.define('employee', {
        id_employee: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        id_profile: DataTypes.INTEGER,
        id_lang: DataTypes.INTEGER,
        lastname: DataTypes.STRING,
        firstname: DataTypes.STRING,
        email: DataTypes.STRING,
        passwd: DataTypes.STRING,
        last_passwd_gen: DataTypes.DATE,
        default_tab: DataTypes.INTEGER,
        active: DataTypes.INTEGER,
        last_connection_date: DataTypes.DATE,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    })

    return employee;
}