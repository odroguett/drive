const mongoose = require("mongoose")

const schema = mongoose.Schema;

const institucionSchema = new schema({

    _id: { type: String},
    descripcion: {
        type: String,
        minlength: 6,
        required: true
    },
    rut: {
        type: String,
    }
},{_id:false})

const model = mongoose.model('instituciones', institucionSchema);

module.exports = model;