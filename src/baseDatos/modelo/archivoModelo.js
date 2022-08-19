const mongoose = require("mongoose")

const schema = mongoose.Schema;

const archivosSchema = new schema({
    
    descripcion: {
        type: String,
        minlength: 6,
        required: true
    },
    texto: { type: String},
    numero: { type: String},
    id_carpeta: {type: String},
    link: {type: String},
    desactivar: {type: String},
    
})

const model = mongoose.model('archivos', archivosSchema);

module.exports = model;