const { Schema, model } = require('mongoose');

const VentaSchema = Schema({
    numeroVenta: {
        type: String,
        required: [true, 'El numero Venta es obligatorio'],
        unique: true
    },
    idCliente: {
        type: String,
    },
    venta: {
        fecha: String,
        username: String,
        numeroVenta: String,
        region: String,
        comuna: String,
        despacho: Number,
        totalInstalacion: Number,
        totalConfiguracion: Number,
        valorProducto: Number,
        valorIva: Number,
        totalCompra: Number,
    },
    cliente: {
        nombre: String,
        apellido: String,
        telefono: String,
        correo: String,
        direccion: {
            calle: String,
            region: String,
            comuna: String
        }
    },
    productos: {
        type: Array,
    },
    activo: {
        type: Boolean,
        default: true
    },
    usuario: {
        type: String,
        required: true
    },
});

// Eliminamos la version 
VentaSchema.methods.toJSON = function() {
    const { __v, ...data } = this.toObject();
    return data;
}

module.exports = model('Venta', VentaSchema);