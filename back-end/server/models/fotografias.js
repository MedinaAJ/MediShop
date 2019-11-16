module.exports=(sequelize, DataTypes) => {
	const fotografias = sequelize.define('fotografias', {
		id: {
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER 
		},
		fotografia: DataTypes.STRING,
		descripcion: DataTypes.STRING,
		imagen: DataTypes.STRING,
		activo: DataTypes.BOOLEAN,
		numero: DataTypes.INTEGER,
		autor: DataTypes.STRING,
		usuario_creacion: DataTypes.STRING
	})
	
	return fotografias;
}  