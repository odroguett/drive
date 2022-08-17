const Joi = require('joi');

const id = Joi.number();
const nombre = Joi.string().min(6).max(30);
const usuario = Joi.string().min(3).max(30);


const carpetaSchema = Joi.object({id: id.required(), nombre: nombre.required(), usuario:usuario.required()});

module.exports = {
    carpetaSchema
}