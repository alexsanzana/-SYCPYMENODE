const { Schema, model } = require('mongoose');

const TipoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria'],
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
TipoSchema.methods.toJSON = function() {
    const { __v, ...data } = this.toObject();
    return data;
}

module.exports = model('Tipo', TipoSchema);