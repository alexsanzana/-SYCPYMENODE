const { request, response } = require("express");
const { Comuna } = require("../models");

const obtenerComunas = async(req = request, res = response) => {
    const { limite = 500, desde = 0 } = req.query;
    const [total, respuesta] = await Promise.all([
        Comuna.countDocuments(),
        Comuna.find()
        .populate('usuario', 'nombre')
        .populate('region', 'nombre') // asanzana
        .limit(Number(limite))
        .skip(Number(desde))
    ]);
    res.json({
        total,
        respuesta
    });
}

const crearComuna = async(req = request, res = response) => {
    try {
        const comunaRegionDB = await Comuna.findOne({ nombre: req.body.nombre.toUpperCase(), region: req.body.region })
        if (comunaRegionDB) {
            return res.json({
                msg: `La comuna ${ comunaRegionDB.nombre } ya existe`
            });
        } else {
            const data = {
                nombre: req.body.nombre.toUpperCase(),
                region: req.body.region, // asanzana 
                despacho: req.body.despacho,
                usuario: req.usuario._id
            }
            const comuna = await new Comuna(data);
            //Guardar DB seria bueno tener esto dentro de un trycatch
            await comuna.save();
            res.status(201).json(comuna);
        }
    } catch (error) {
        res.status(400).json({ error })
    }
}

const actualizarComuna = async(req = request, res = response) => {
    try {
        const { id } = req.params;
        const { activo, usuario, ...data } = req.body;
        data.nombre = data.nombre.toUpperCase();
        data.region = data.region; // asanzana 
        data.despacho = data.despacho;
        data.usuario = req.usuario._id;
        const comuna = await Comuna.findByIdAndUpdate(id, data, { new: true });
        res.json(comuna);
    } catch (error) {
        res.status(400).json({ error })
    }
}

// Desactivar o activa segun corresponda
const desactivarActivarComuna = async(req = request, res = response) => {
    const { id } = req.params;
    const comunaDB = await Comuna.findById(id);
    if (comunaDB.activo) {
        const comunaDesactivada = await Comuna.findByIdAndUpdate(id, { activo: false }, { new: true });
        res.json(comunaDesactivada);
    } else {
        const comunaActivada = await Comuna.findByIdAndUpdate(id, { activo: true }, { new: true });
        res.json(comunaActivada);
    }
}

module.exports = {
    obtenerComunas,
    crearComuna,
    actualizarComuna,
    desactivarActivarComuna
}