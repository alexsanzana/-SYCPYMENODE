const { request, response } = require("express");
const { Regione } = require("../models");

const obtenerRegiones = async(req = request, res = response) => {
    const { limite = 500, desde = 0 } = req.query;
    const [total, respuesta] = await Promise.all([
        Regione.countDocuments(),
        Regione.find()
        .populate('usuario', 'nombre')
        .limit(Number(limite))
        .skip(Number(desde))
    ]);
    res.json({
        total,
        respuesta
    });
}

const crearRegion = async(req = request, res = response) => {
    const { nombre } = req.body.nombre.toUpperCase();
    const regionDB = await Regione.findOne({ nombre });
    if (regionDB) {
        return res.status(400).json({
            msg: `La Región ${ regionDB.nombre } ya existe`
        });
    }
    const data = {
        nombre: req.body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }
    const region = await new Regione(data);
    await region.save();
    res.status(201).json(region);
}

const actualizarRegion = async(req = request, res = response) => {
    const { id } = req.params;
    const { usuario, ...data } = req.body;
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;
    const region = await Regione.findByIdAndUpdate(id, data, { new: true });
    res.json(region);
}

// Desactivar o activa segun corresponda
const desactivarActivarRegion = async(req = request, res = response) => {
    const { id } = req.params;
    const regionDB = await Regione.findById(id);
    if (regionDB.activo) {
        const regionDesactivado = await Regione.findByIdAndUpdate(id, { activo: false }, { new: true });
        res.json(regionDesactivado);
    } else {
        const regionActivada = await Regione.findByIdAndUpdate(id, { activo: true }, { new: true });
        res.json(regionActivada);
    }
}

module.exports = {
    obtenerRegiones,
    crearRegion,
    actualizarRegion,
    desactivarActivarRegion
}