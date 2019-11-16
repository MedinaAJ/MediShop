const employee = require('../models').employee;
const jwt = require('../services/jwt');

function create(req, res) {
    employee.create(req.body)
        .then(employee => {
            res.status(200).send({ employee });
        })
        .catch(err => {
            res.status(500).send({ err });
        })
}

function inicio_sesion(req, res) {
    employee.findOne({
            where: {
                email: req.body.email,
                passwd: req.body.passwd
            }
        })
        .then(employee => {
            if (employee) {
                if (req.body.token) {
                    res.status(200).send({
                        token: jwt.createToken(employee)
                    });
                } else {
                    res.status(200).send({
                        employee: employee,
                        token: jwt.createToken(employee)
                    });
                }
            } else {
                res.status(401).send({ message: 'Acceso no autorizado' });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrio un error al buscar el usuario" });
        })
}

function getAll(req, res) {
    employee.findAll()
        .then(employees => {
            res.status(200).send({ employees });
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrio un error al buscar la lista de usuarios." });
        })
}

module.exports = {
    inicio_sesion,
    create,
    getAll
}