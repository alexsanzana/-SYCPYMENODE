const { Schema, model } = require('mongoose');

const CompraSchema = Schema({
    numeroCompra: {
        type: String,
        required: [true, 'El número Compra es obligatorio'],
        unique: true
    },
    idProveedor: {
        type: String,
    },
    username: String,
    boleta: { type: String },
    costoEnvio: { type: String },
    descripcion: { type: String },
    factura: { type: String },
    fecha: { type: String },
    fee: { type: String },
    nombre: { type: String },
    nombreEmpresa: { type: String },
    rut: { type: String },
    tipoCompra: { type: String },
    valorCompra: { type: String },
    totalCompra: { type: String },
    img: { type: String },
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
CompraSchema.methods.toJSON = function() {
    const { __v, ...data } = this.toObject();
    return data;
}

module.exports = model('Compra', CompraSchema);