const { request, response } = require("express");
const { Cliente } = require("../models");

const obtenerClientes = async(req = request, res = response) => {
    const { limite = 500, desde = 0 } = req.query;
    const [total, respuesta] = await Promise.all([
        Cliente.countDocuments(),
        Cliente.find()
        .populate('usuario', 'nombre')
        .limit(Number(limite))
        .skip(Number(desde))
    ]);
    res.json({
        total,
        respuesta
    });
}

const crearCliente = async(req = request, res = response) => {
    try {
        const clienteDB = await Cliente.findOne({ rut: req.body.rut })
        if (clienteDB) { // asanzana consulto por el rut del Cliente.
            return res.json({
                msg: `El Cliente ${ clienteDB.nombre } ya existe`
            });
        } else {
            const data = {
                nombre: req.body.nombre.toUpperCase(),
                apellido: req.body.apellido,
                rut: req.body.rut,
                rutEmpresa: req.body.rutEmpresa,
                correo: req.body.correo,
                telefono: req.body.telefono,
                fecha: req.body.fecha,
                tipoCanal: req.body.tipoCanal,
                tipoCliente: req.body.tipoCliente,
                calle: req.body.calle,
                region: req.body.region,
                comuna: req.body.comuna,
                usuario: req.usuario._id
            }
            const cliente = await new Cliente(data);
            await cliente.save();
            res.status(201).json(cliente);
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ error })
    }
}

const actualizarCliente = async(req = request, res = response) => {
    try {
        const { id } = req.params;
        const { activo, usuario, ...data } = req.body;
        data.nombre = data.nombre.toUpperCase();
        data.apellido = data.apellido;
        data.rut = data.rut;
        data.rutEmpresa = data.rutEmpresa;
        data.correo = data.correo;
        data.telefono = data.telefono;
        data.fecha = data.fecha;
        data.tipoCanal = data.tipoCanal;
        data.tipoCliente = data.tipoCliente;
        data.calle = data.calle;
        data.region = data.region;
        data.comuna = data.comuna;
        data.usuario = req.usuario._id;
        const cliente = await Cliente.findByIdAndUpdate(id, data, { new: true });
        res.json(cliente);
    } catch (error) {
        res.status(400).json({ error })
    }
}

// Desactivar o activa segun corresponda
const desactivarActivarCliente = async(req = request, res = response) => {
    const { id } = req.params;
    const clienteDB = await Cliente.findById(id);
    if (clienteDB.activo) {
        const clienteDesactivado = await Cliente.findByIdAndUpdate(id, { activo: false }, { new: true });
        res.json(clienteDesactivado);
    } else {
        const clienteActivado = await Cliente.findByIdAndUpdate(id, { activo: true }, { new: true });
        res.json(clienteActivado);
    }
}

module.exports = {
    obtenerClientes,
    crearCliente,
    actualizarCliente,
    desactivarActivarCliente
}