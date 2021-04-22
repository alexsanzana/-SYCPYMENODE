const { Schema, model } = require('mongoose');

const ComunaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    region: {
        type: Schema.Types.ObjectId,
        ref: 'Regione',
        required: true
    },
    despacho: {
        type: Number,
        default: 0
    },
    activo: {
        type: Boolean,
        default: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

// Eliminamos la version 
ComunaSchema.methods.toJSON = function() {
    const { __v, ...data } = this.toObject();
    return data;
}

module.exports = model('Comuna', ComunaSchema);