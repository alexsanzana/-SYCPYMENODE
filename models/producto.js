const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    activo: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    precio: {
        type: Number,
        default: 0
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    descripcion: { type: String },
    descripcionCompleta: { type: String },
    caracteristicas: { type: String },
    disponible: { type: Boolean, default: true },
    cantidad: { type: Number },
    configuracion: { type: Number },
    instalacion: { type: Number },
    tiempoInstalacion: { type: Number },
    cantidadXUnidad: { type: Number },
    umbral: { type: Number },
    img: { type: String }
});

// Eliminamos la version y el password
ProductoSchema.methods.toJSON = function() {
    const { __v, ...data } = this.toObject();
    return data;
}

module.exports = model('Producto', ProductoSchema);