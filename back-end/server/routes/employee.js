const employeeController = require('../controllers').employee;
const authenticated = require('../authenticated/authenticated');

module.exports = (app) => {
    app.post('/api/crear_empleado', authenticated.auth, employeeController.create);
    app.post('/api/inicio_sesion', employeeController.inicio_sesion);
    app.get('/api/listar_empleados', authenticated.auth, employeeController.getAll);
}