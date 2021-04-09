const path = require('path');
const fs = require('fs');

var cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

const { request, response } = require("express");
const { subirArchivo } = require('../helpers');
const { Usuario, Producto } = require('../models');

const cargarArchivo = async(req = request, res = response) => {

        try {
            // Archivos 
            const extensiones = ['txt', 'docx', 'pdf'];
            // const nombre = await subirArchivo(req.files, extensiones, 'archivos');
            // const extensiones = ['jpg', 'jpeg', 'png', 'gif'];
            const nombre = await subirArchivo(req.files, extensiones, 'archivos');
            res.json({ nombre });
        } catch (error) {
            res.status(400).json({ error })
        }

    }
    // esta es solo de prueba local 
const actualizarImagen = async(req = request, res = response) => {

        const { id, coleccion } = req.params;
        let modelo;
        switch (coleccion) {
            case 'usuarios':
                modelo = await Usuario.findById(id);
                if (!modelo) {
                    return res.status(400).json({
                        msg: `No existe un usuario con el Id ${id}`
                    });
                }
                break;
            case 'productos':
                modelo = await Producto.findById(id);
                if (!modelo) {
                    return res.status(400).json({
                        msg: `No existe un producto con el Id ${id}`
                    });
                }
                break;

            default:
                return res.status(500).json({ msg: 'Se me olvido Validar esto' });
        }

        // Limpiar imagenes Previas
        try {
            if (modelo.img) {
                // hay que borrar la imagen del servidor
                const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
                if (fs.existsSync(pathImagen)) {
                    fs.unlinkSync(pathImagen);
                }
            }

        } catch (error) {
            res.status(400).json({ error })
        }

        const nombre = await subirArchivo(req.files, undefined, coleccion);
        modelo.img = nombre;
        await modelo.save();

        res.json(modelo);

    }
    // esta se ocupa
const actualizarImagenCloudinary = async(req = request, res = response) => {

    const { id, coleccion } = req.params;
    let modelo;
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el Id ${id}`
                });
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el Id ${id}`
                });
            }
            break;

        default:
            return res.status(500).json({ msg: 'Se me olvido Validar esto' });
    }

    // Limpiar imagenes Previas
    try {
        if (modelo.img) {
            const nombreArr = modelo.img.split('/');
            const nombre = nombreArr[nombreArr.length - 1];
            const [public_id] = nombre.split('.');
            cloudinary.uploader.destroy(public_id);
        }
        const { tempFilePath } = req.files.archivo
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
        modelo.img = secure_url;
        await modelo.save();
        res.json(modelo);

    } catch (error) {
        res.status(400).json({ error })
    }
}

const mostrarImagen = async(req = request, res = response) => {
    const { id, coleccion } = req.params;
    let modelo;
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el Id ${id}`
                });
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el Id ${id}`
                });
            }
            break;

        default:
            return res.status(500).json({ msg: 'Se me olvido Validar esto' });
    }

    // Limpiar imagenes Previas
    // if (modelo.img) {
    res.json(modelo);
    /*     } else {
            const pathImagen = path.join(__dirname, '../assets/no-image.jpg');
            res.sendFile(pathImagen);
        } */
}

module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary
}