const Joi = require('joi');

const id = Joi.string().alphanum().min(3).max(6);
const descripcion = Joi.string().min(6).max(30);


const institucionSchema = Joi.object({id: id.required(), descripcion: descripcion.required()});

module.exports = {
    institucionSchema
}