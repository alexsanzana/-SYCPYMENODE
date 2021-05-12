const { request, response } = require("express");
const { Empleado } = require("../models");

const obtenerEmpleados = async(req = request, res = response) => {
    const { limite = 500, desde = 0 } = req.query;
    const [total, respuesta] = await Promise.all([
        Empleado.countDocuments(),
        Empleado.find()
        .populate('usuario', 'nombre')
        .limit(Number(limite))
        .skip(Number(desde))
    ]);
    res.json({
        total,
        respuesta
    });
}

const crearEmpleado = async(req = request, res = response) => {
    try {
        const empleadoDB = await Empleado.findOne({ rut: req.body.rut })
        if (empleadoDB) { // asanzana consulto por el rut del empleado.
            return res.json({
                msg: `El Empleado ${ empleadoDB.nombre } ya existe`
            });
        } else {
            const data = {
                nombre: req.body.nombre.toUpperCase(),
                apellido: req.body.apellido,
                rut: req.body.rut,
                correo: req.body.correo,
                telefono: req.body.telefono,
                fecha: req.body.fecha,
                tipoEmpleado: req.body.tipoEmpleado,
                calle: req.body.calle,
                region: req.body.region,
                comuna: req.body.comuna,
                usuario: req.usuario._id
            }
            const empleado = await new Empleado(data);
            await empleado.save();
            res.status(201).json(empleado);
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ error })
    }
}

const actualizarEmpleado = async(req = request, res = response) => {
    try {
        const { id } = req.params;
        const { activo, usuario, ...data } = req.body;
        data.nombre = data.nombre.toUpperCase();
        data.apellido = data.apellido;
        data.rut = data.rut;
        data.correo = data.correo;
        data.telefono = data.telefono;
        data.fecha = data.fecha;
        data.tipoEmpleado = data.tipoEmpleado;
        data.calle = data.calle;
        data.region = data.region;
        data.comuna = data.comuna;
        data.usuario = req.usuario._id;
        const empleado = await Empleado.findByIdAndUpdate(id, data, { new: true });
        res.json(empleado);
    } catch (error) {
        res.status(400).json({ error })
    }
}

// Desactivar o activa segun corresponda
const desactivarActivarEmpleado = async(req = request, res = response) => {
    const { id } = req.params;
    const empleadoDB = await Empleado.findById(id);
    if (empleadoDB.activo) {
        const empleadoDesactivado = await Empleado.findByIdAndUpdate(id, { activo: false }, { new: true });
        res.json(empleadoDesactivado);
    } else {
        const empleadoActivado = await Empleado.findByIdAndUpdate(id, { activo: true }, { new: true });
        res.json(empleadoActivado);
    }
}

module.exports = {
    obtenerEmpleados,
    crearEmpleado,
    actualizarEmpleado,
    desactivarActivarEmpleado
}