const { request, response } = require("express");
const { Cotizacione } = require("../models");

const obtenerCotizaciones = async(req = request, res = response) => {
    const { limite = 500, desde = 0 } = req.query;
    const [total, respuesta] = await Promise.all([
        Cotizacione.countDocuments(),
        Cotizacione.find()
        .limit(Number(limite))
        .skip(Number(desde))
    ]);
    res.json({
        total,
        respuesta
    });
}

const obtenerCotizacion = async(req = request, res = response) => {
    const { id } = req.params;
    const cotizacion = await Cotizacione.findById(id)
    res.json(cotizacion);
}

const crearCotizacion = async(req = request, res = response) => {

    const { activo, ...data } = req.body;
    data.usuario = req.usuario._id;
    const cotizacion = await new Cotizacione(data);
    await cotizacion.save();
    res.status(201).json(cotizacion);
}

const actualizarCotizacion = async(req = request, res = response) => {
    try {
        const { id } = req.params;
        const { activo, usuario, ...data } = req.body;
        /* data.nombre = data.nombre.toUpperCase(); */
        data.usuario = req.usuario._id;
        const cotizacion = await Cotizacione.findByIdAndUpdate(id, data, { new: true });
        res.json(cotizacion);
    } catch (error) {
        res.status(400).json({ error })
    }
}

// Desactivar o activa segun corresponda
const desactivarActivarCotizacion = async(req = request, res = response) => {
    const { id } = req.params;
    const cotizacionDB = await Cotizacione.findById(id);
    if (cotizacionDB.activo) {
        const cotizacionDesactivada = await Cotizacione.findByIdAndUpdate(id, { activo: false }, { new: true });
        res.json(cotizacionDesactivada);
    } else {
        const cotizacionActivada = await Cotizacione.findByIdAndUpdate(id, { activo: true }, { new: true });
        res.json(cotizacionActivada);
    }
}

module.exports = {
    obtenerCotizaciones,
    obtenerCotizacion,
    crearCotizacion,
    actualizarCotizacion,
    desactivarActivarCotizacion
}