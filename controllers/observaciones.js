const { request, response } = require("express");
const { Observacione } = require("../models");

const obtenerObservaciones = async(req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { activo: true };
    const [total, observaciones] = await Promise.all([
        Observacione.countDocuments(query),
        Observacione.find(query)
        .populate('usuario', 'nombre')
        .limit(Number(limite))
        .skip(Number(desde))
    ]);
    res.json({
        total,
        observaciones
    });
}

const crearObservacion = async(req = request, res = response) => {
    const nombre = req.body.nombre.toUpperCase();
    const observacionDB = await Observacione.findOne({ nombre });
    if (observacionDB) {
        return res.status(400).json({
            msg: `La observacion ${ observacionDB.nombre } ya existe`
        });
    }
    // generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }
    const observacion = await new Observacione(data);
    //Guardar DB seria bueno tener esto dentro de un trycatch
    await observacion.save();
    res.status(201).json(observacion);
}

const actualizarObservacion = async(req = request, res = response) => {
    const { id } = req.params;
    // eliminamos activo y usuario por si son enviados desde el frontEnd
    const { activo, usuario, ...data } = req.body;
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;
    const observacion = await Observacione.findByIdAndUpdate(id, data, { new: true });
    res.json(observacion);
}

// Desactivar observacion activo:false
const desactivarObservacion = async(req = request, res = response) => {
    const { id } = req.params;
    const observacionDesactivada = await Observacione.findByIdAndUpdate(id, { activo: false }, { new: true });
    res.json(observacionDesactivada);
}

module.exports = {
    obtenerObservaciones,
    crearObservacion,
    actualizarObservacion,
    desactivarObservacion
}