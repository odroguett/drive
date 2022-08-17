const Joi = require('joi');

const usuario = Joi.string().alphanum().min(6).max(30);
const password = Joi.string().min(6).max(30);
const email = Joi.string().max(60);
const descripcion = Joi.string().max(60);
const perfil = Joi.string().min(3).max(60);
const activo = Joi.string().min(2).max(2);
const institucion_id = Joi.string().min(3).max(30);

const usuarioLoginSchema = Joi.object({usuario: usuario.required(), password: password.required()});

const usuarioSchema = Joi.object({usuario: usuario.required(), password: password.required(), 
    email: email.required(), perfil: perfil.required(),descripcion,activo:activo,institucion_id:institucion_id})

module.exports = {
    usuarioLoginSchema,usuarioSchema
}

