const Joi = require('joi');
const nombre = Joi.string().min(6).max(30);
const usuario = Joi.string().min(3).max(30);


const carpetaSchema = Joi.object({ nombre: nombre.required(), usuario:usuario.required()});

module.exports = {
    carpetaSchema
}