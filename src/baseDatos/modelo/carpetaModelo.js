const mongoose = require("mongoose")

const schema = mongoose.Schema;

const carpetaSchema = new schema({

    _id: { type: Number},
    nombre: {
        type: String,
        minlength: 6,
        required: true
    },
    archivo:[],
    
},{_id:false})

const model = mongoose.model('carpetas', carpetaSchema);

module.exports = model;