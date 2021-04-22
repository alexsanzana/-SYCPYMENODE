const { request, response } = require("express");
const { Codigo } = require("../models");

const obtenerCodigos = async(req = request, res = response) => {
    const { limite = 500, desde = 0 } = req.query;
    const [total, respuesta] = await Promise.all([
        Codigo.countDocuments(),
        Codigo.find()
        .populate('usuario', 'nombre')
        .limit(Number(limite))
        .skip(Number(desde))
    ]);
    res.json({
        total,
        respuesta
    });
}

const crearCodigo = async(req = request, res = response) => {
    const { nombre } = req.body.nombre.toUpperCase();
    const codigoDB = await Codigo.findOne({ nombre });
    if (codigoDB) {
        return res.status(400).json({
            msg: `El Código ${ codigoDB.nombre } ya existe`
        });
    }
    // generar la data a guardar
    const data = {
        nombre: req.body.nombre.toUpperCase(),
        descripcion: req.body.descripcion,
        usuario: req.usuario._id
    }
    const codigo = await new Codigo(data);
    //Guardar DB seria bueno tener esto dentro de un trycatch
    await codigo.save();
    res.status(201).json(codigo);
}


const actualizarCodigo = async(req = request, res = response) => {
    try {
        const { id } = req.params;
        // eliminamos activo y usuario por si son enviados desde el frontEnd
        const { activo, usuario, ...data } = req.body;
        data.nombre = data.nombre.toUpperCase();
        data.descripcion = data.descripcion
        data.usuario = req.usuario._id;
        const codigo = await Codigo.findByIdAndUpdate(id, data, { new: true });
        res.json(codigo);
    } catch (error) {
        throw new Error(error);
    }

}


// Desactivar o activa segun corresponda
const desactivarActivarCodigo = async(req = request, res = response) => {
    const { id } = req.params;
    const codigoDB = await Codigo.findById(id);
    if (codigoDB.activo) {
        const codigoDesactivado = await Codigo.findByIdAndUpdate(id, { activo: false }, { new: true });
        res.json(codigoDesactivado);
    } else {
        const codigoActivado = await Codigo.findByIdAndUpdate(id, { activo: true }, { new: true });
        res.json(codigoActivado);
    }
}

module.exports = {
    obtenerCodigos,
    crearCodigo,
    actualizarCodigo,
    desactivarActivarCodigo
}