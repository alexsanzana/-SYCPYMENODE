const { Schema, model } = require('mongoose');

const CotizacionSchema = Schema({
    numeroCotizacion: {
        type: String,
        required: [true, 'El numero Cotización es obligatorio'],
        unique: true
    },
    idCliente: {
        type: String,
    },
    cotizacion: {
        fecha: String,
        username: String,
        numeroCotizacion: String,
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
    observaciones: {
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
CotizacionSchema.methods.toJSON = function() {
    const { __v, ...data } = this.toObject();
    return data;
}

module.exports = model('Cotizacione', CotizacionSchema);