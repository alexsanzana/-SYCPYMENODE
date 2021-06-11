const { Schema, model } = require('mongoose');

const AgendaSchema = Schema({
    agenda: {
        type: Array,
    },
    creacion: {
        type: String,
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
AgendaSchema.methods.toJSON = function() {
    const { __v, ...data } = this.toObject();
    return data;
}

module.exports = model('Agenda', AgendaSchema);