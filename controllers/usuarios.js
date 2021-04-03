const { request, response } = require('express');

const usuariosGet = (req = request, res = response) => {

    const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;
    res.json({
        msg: 'get Api - controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    })
}

const usuariosPost = (req, res = response) => {
    // al desestructurar evito que me envien cualquier dato que yo no deseo
    const { nombre, edad } = req.body;

    res.json({
        msg: 'Post api - controlador',
        nombre,
        edad
    })
}

const usuariosPut = (req, res = response) => {
    // obtenemos valor enviados como parametros
    const { id } = req.params;
    res.json({
        msg: 'Put api - controlador',
        id
    })
}

const usuariosPatch = (req, res = response) => {

    res.json({
        msg: 'Patch api - controlador'
    })
}


const usuariosDelete = (req, res = response) => {

    res.json({
        msg: 'Delete api - controlador'
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}