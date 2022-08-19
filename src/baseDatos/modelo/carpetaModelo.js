const mongoose = require("mongoose")

const schema = mongoose.Schema;

const carpetaSchema = new schema({
    
    nombre: {
        type: String,
        minlength: 6,
        required: true
    },
    usuario: { type: String},
    archivo:[ ],
    
})

const model = mongoose.model('carpetas', carpetaSchema);

module.exports = model;