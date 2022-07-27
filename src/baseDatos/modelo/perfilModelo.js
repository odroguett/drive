const mongoose = require("mongoose")

const schema = mongoose.Schema;

const perfilSchema = new schema({

    _id: { type: String},
    descripcion: {
        type: String,
        minlength: 6,
        required: true
    }
},{_id:false})

const model = mongoose.model('perfiles', perfilSchema);

module.exports = model;