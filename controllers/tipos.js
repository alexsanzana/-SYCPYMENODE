const { request, response } = require("express");
const { Tipo } = require("../models");

const obtenerTipos = async(req = request, res = response) => {
    const { limite = 500, desde = 0 } = req.query;
    const [total, respuesta] = await Promise.all([
        Tipo.countDocuments(),
        Tipo.find()
        .populate('usuario', 'nombre')
        .limit(Number(limite))
        .skip(Number(desde))
    ]);
    res.json({
        total,
        respuesta
    });
}

const crearTipo = async(req = request, res = response) => {
    const { nombre } = req.body.nombre.toUpperCase();
    const tipoDB = await Tipo.findOne({ nombre });
    if (tipoDB) {
        return res.status(400).json({
            msg: `El tipo ${ tipoDB.nombre } ya existe`
        });
    }
    // generar la data a guardar
    const data = {
        nombre: req.body.nombre.toUpperCase(),
        descripcion: req.body.descripcion,
        usuario: req.usuario._id
    }
    const tipo = await new Tipo(data);
    //Guardar DB seria bueno tener esto dentro de un trycatch
    await tipo.save();
    res.status(201).json(tipo);
}

const actualizarTipo = async(req = request, res = response) => {
    const { id } = req.params;
    // eliminamos activo y usuario por si son enviados desde el frontEnd
    const { activo, usuario, ...data } = req.body;
    data.nombre = data.nombre.toUpperCase();
    data.descripcion = data.descripcion
    data.usuario = req.usuario._id;
    const tipo = await Tipo.findByIdAndUpdate(id, data, { new: true });
    res.json(tipo);
}


// Desactivar o activa segun corresponda
const desactivarActivarTipo = async(req = request, res = response) => {
    const { id } = req.params;
    const tipoDB = await Tipo.findById(id);
    if (tipoDB.activo) {
        const tipoDesactivado = await Tipo.findByIdAndUpdate(id, { activo: false }, { new: true });
        res.json(tipoDesactivado);
    } else {
        const tipoActivado = await Tipo.findByIdAndUpdate(id, { activo: true }, { new: true });
        res.json(tipoActivado);
    }
}

module.exports = {
    obtenerTipos,
    crearTipo,
    actualizarTipo,
    desactivarActivarTipo
}