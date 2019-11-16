const fotografias = require('../models').fotografias;
const fs = require('fs');
const thumb = require('node-thumbnail').thumb;
const path = require('path');

function create(req, res){
	var body = req.body;
	
	fotografias.create(body)
	.then(fotografias => {
		res.status(200).send({fotografias});
	})
	.catch(err => {
		res.status(500).send({message:"Ocurrió error al guardar fotografia " + err});
	})
}

function update(req, res){
	var id = req.params.id;
	var body = req.body;
	
	fotografias.findByPk(id)
	.then(fotografia => {
		fotografia.update(body)
		.then(()=>{ // No se captura el resultado ya que es el numero de registros actualizados
			res.status(200).send({fotografia});
		})
		.catch(err => {
			res.status(500).send({message:"Ocurrio un error al actualizar la fotografia "+err});
		})
	})
	.catch(err => {
		res.status(500).send({message:"Ocurrio un error al actualizar la fotografia "+err});
	})
}

function uploadFotografia(req, res){
	var id = req.params.id;
	
	if(req.files){
		var file_path = req.files.foto.path;
		var file_split=file_path.split('\\');
		var file_name = file_split[3];
		
		if(file_name.split(".")[file_name.split.length-1] != "PNG" && file_name.split(".")[file_name.split.length-1] != "JPG" && file_name.split(".")[file_name.split.length-1] != "jpg" && file_name.split(".")[file_name.split.length-1] != "png"){
			fs.unlink(file_path, (err)=>{ // Este metodo elimina una fotografia pasando una ruta como parametro
				if(err){
					res.status(500).send({message:"Ocurrio un error al eliminar el archivo"});
				}
			})
			res.status(500).send({message:"Formato del fichero no valido"});
		}else{
			fotografias.findByPk(id)
			.then(fotografia => {
				if(fotografia.imagen){ //mio
					fs.unlink('./server/uploads/fotografias/' + fotografia.imagen, (err)=>{
						if(err){
							res.status(500).send({message:"Ocurrio un error al eliminar la imagen antigua"});
						}
					})
					fs.unlink('./server/uploads/fotografias/thumbs/' + fotografia.imagen, (err)=>{
						if(err){
							res.status(500).send({message:"Ocurrio un error al eliminar la miniatura antigua"});
						}
					})
				} //fin mio. Este codigo sirve para eliminar la imagen antigua, ya que se va a reemplazar por otra y esta se quedaria huerfana ocupando espacio en el servidor
				
				var fotografiaF = {};
				fotografiaF.imagen = file_name;
			
				fotografia.update(fotografiaF)
				.then(()=>{ 
					var newPath = './server/uploads/fotografias/' + file_name;
					var thumbPath = './server/uploads/fotografias/thumbs';
					
					thumb({
						source: path.resolve(newPath),
						destination: path.resolve(thumbPath),
						width: 200,
						suffix: ''
					}).then(()=>{
						res.status(200).send({fotografia});
					}).catch((err)=>{
						res.status(500).send({message:"Ocurrio un error al crear la miniatura de la foto"});
					});
					
				})
				.catch(err => {
					fs.unlink(file_path, (err)=>{
						if(err){
							res.status(500).send({message:"Ocurrio un error al eliminar el archivo"});
						}
					})
					res.status(500).send({message:"Ocurrio un error al actualizar la fotografia "+err});
				})
			})
			.catch(err =>{
				fs.unlink(file_path, (err)=>{
					if(err){
						res.status(500).send({message:"Ocurrio un error al eliminar el archivo"});
					}
				})
				res.status(500).send({message:"Ocurrio un error al buscar la fotografia a la que actualizar la imagen "+err});
			})
		}
	}else{
		res.status(404).send({message:"La fotografia no ha sido encontrada en la peticion"});
	}
}

function getFotografia(req, res){
	var fotografia = req.params.fotografia;
	var thumb = req.params.thumb;
	if(thumb == 'false')
		var path_foto = './server/uploads/fotografias/'+fotografia;
	else
		var path_foto = './server/uploads/fotografias/thumbs/'+fotografia;
	
	fs.exists(path_foto, (exists)=>{
		if(exists){
			res.sendFile(path.resolve(path_foto));
		}else{
			res.status(404).send({message:"No se ha encontrado la fotografia"});
		}
	})
}

function getAll(req, res){
	fotografias.findAll({
		where:{
			activo: true
		},
		order:[
			['numero', 'ASC']
		]
	})
	.then(fotografias => {
		res.status(200).send({fotografias});
	})
	.catch(err => {
		res.status(500).send({message:"Ocurrio un error al buscar las fotografias"});
	})
}

function getAllAdmin(req, res){
	fotografias.findAll({
		order:[
			['numero', 'ASC']
		]
	})
	.then(fotografias => {
		res.status(200).send({fotografias});
	})
	.catch(err => {
		res.status(500).send({message:"Ocurrio un error al buscar las fotografias"});
	})
}

module.exports={
	create,
	update,
	getFotografia,
	getAll,
	getAllAdmin,
	uploadFotografia
}