const { request, response } = require("express");
const { Proveedore } = require("../models");

const obtenerProveedores = async(req = request, res = response) => {
    const { limite = 500, desde = 0 } = req.query;
    const [total, respuesta] = await Promise.all([
        Proveedore.countDocuments(),
        Proveedore.find()
        .populate('usuario', 'nombre')
        .limit(Number(limite))
        .skip(Number(desde))
    ]);
    res.json({
        total,
        respuesta
    });
}

const obtenerProveedor = async(req = request, res = response) => {
    const { id } = req.params;
    const proveedor = await Proveedore.findById(id)
        .populate('usuario', 'nombre')
    res.json(proveedor);
}

const crearProveedor = async(req = request, res = response) => {
    try {
        const proveedorDB = await Proveedore.findOne({ nombre: req.body.nombre.toUpperCase() })
        if (proveedorDB) {
            return res.json({
                msg: `El Proveedor ${ proveedorDB.nombre } ya existe`
            });
        } else {
            const data = { // asanzana falta la dirección
                nombre: req.body.nombre.toUpperCase(),
                nombreEmpresa: req.body.nombreEmpresa,
                rut: req.body.rut,
                correo: req.body.correo,
                telefono: req.body.telefono,
                fecha: req.body.fecha,
                tipoPlataforma: req.body.tipoPlataforma,
                tipoProveedor: req.body.tipoProveedor,
                calle: req.body.calle,
                region: req.body.region,
                comuna: req.body.comuna,
                linkEmpresa: req.body.linkEmpresa,
                usuario: req.usuario._id
            }
            const proveedor = await new Proveedore(data);
            await proveedor.save();
            res.status(201).json(proveedor);
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ error })
    }
}

const actualizarProveedor = async(req = request, res = response) => {
    try { // asanzana falta la dirección
        const { id } = req.params;
        const { activo, usuario, ...data } = req.body;
        data.nombre = data.nombre.toUpperCase();
        data.nombreEmpresa = data.nombreEmpresa;
        data.rut = data.rut;
        data.correo = data.correo;
        data.telefono = data.telefono;
        data.fecha = data.fecha;
        data.tipoPlataforma = data.tipoPlataforma;
        data.tipoProveedor = data.tipoProveedor;
        data.calle = data.calle;
        data.region = data.region;
        data.comuna = data.comuna;
        data.linkEmpresa = data.linkEmpresa;
        data.usuario = req.usuario._id;
        const proveedor = await Proveedore.findByIdAndUpdate(id, data, { new: true });
        res.json(proveedor);
    } catch (error) {
        res.status(400).json({ error })
    }
}

// Desactivar o activa segun corresponda
const desactivarActivarProveedor = async(req = request, res = response) => {
    const { id } = req.params;
    const proveedorDB = await Proveedore.findById(id);
    if (proveedorDB.activo) {
        const proveedorDesactivado = await Proveedore.findByIdAndUpdate(id, { activo: false }, { new: true });
        res.json(proveedorDesactivado);
    } else {
        const proveedorActivado = await Proveedore.findByIdAndUpdate(id, { activo: true }, { new: true });
        res.json(proveedorActivado);
    }
}

module.exports = {
    obtenerProveedores,
    obtenerProveedor,
    crearProveedor,
    actualizarProveedor,
    desactivarActivarProveedor
}