const { request, response } = require("express");
const { Observacione } = require("../models");

const obtenerObservaciones = async(req = request, res = response) => {
    const { limite = 500, desde = 0 } = req.query;
    const [total, respuesta] = await Promise.all([
        Observacione.countDocuments(),
        Observacione.find()
        .populate('usuario', 'nombre')
        .limit(Number(limite))
        .skip(Number(desde))
    ]);
    res.json({
        total,
        respuesta
    });
}

const crearObservacion = async(req = request, res = response) => {
    const { nombre } = req.body.nombre.toUpperCase();
    const observacionDB = await Observacione.findOne({ nombre });
    if (observacionDB) {
        return res.status(400).json({
            msg: `La observacion ${ observacionDB.nombre } ya existe`
        });
    }
    // generar la data a guardar
    const data = {
        nombre: req.body.nombre.toUpperCase(),
        descripcion: req.body.descripcion,
        usuario: req.usuario._id
    }
    const observacion = await new Observacione(data);
    console.log('object ' + observacion);
    //Guardar DB seria bueno tener esto dentro de un trycatch
    await observacion.save();
    res.status(201).json(observacion);
}

const actualizarObservacion = async(req = request, res = response) => {
    const { id } = req.params;
    // eliminamos activo y usuario por si son enviados desde el frontEnd
    const { activo, usuario, ...data } = req.body;
    data.nombre = data.nombre.toUpperCase();
    data.descripcion = data.descripcion
    data.usuario = req.usuario._id;
    const observacion = await Observacione.findByIdAndUpdate(id, data, { new: true });
    res.json(observacion);
}


// Desactivar o activa segun corresponda
const desactivarActivarObservacion = async(req = request, res = response) => {
    const { id } = req.params;
    const observacionDB = await Observacione.findById(id);
    if (observacionDB.activo) {
        const observacionDesactivada = await Observacione.findByIdAndUpdate(id, { activo: false }, { new: true });
        res.json(observacionDesactivada);
    } else {
        const observacionDesactivada = await Observacione.findByIdAndUpdate(id, { activo: true }, { new: true });
        res.json(observacionDesactivada);
    }
}

module.exports = {
    obtenerObservaciones,
    crearObservacion,
    actualizarObservacion,
    desactivarActivarObservacion
}