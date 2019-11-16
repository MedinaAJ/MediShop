const fotografiasController = require('../controllers').fotografias;
const authenticated = require('../authenticated/authenticated');
const cm = require('connect-multiparty');
const md_upload = cm({uploadDir: './server/uploads/fotografias'});

module.exports = (app) => {
	app.post('/api/fotografia', authenticated.auth, fotografiasController.create);
	app.put('/api/fotografia/:id', authenticated.auth, fotografiasController.update);
	app.post('/api/upload/fotografia/:id', [authenticated.auth, md_upload], fotografiasController.uploadFotografia);
	app.get('/api/get-fotografia/:fotografia/:thumb', fotografiasController.getFotografia);
	app.get('/api/fotografias', fotografiasController.getAll);
	app.get('/api/fotografias-admin', authenticated.auth, fotografiasController.getAllAdmin);
}