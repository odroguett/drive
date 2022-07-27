const Joi = require('joi');

const usuario = Joi.string().alphanum().min(6).max(30);
const password = Joi.string().min(6).max(30);
const mail = Joi.string().max(60);
const nombre = Joi.string().max(60);
const descripcion = Joi.string().max(60);
const perfil = Joi.string().min(3).max(60);

const usuarioLoginSchema = Joi.object({usuario: usuario.required(), password: password.required()});

const usuarioSchema = Joi.object({usuario: usuario.required(), password: password.required(), 
                                  mail: mail.required(), perfil: perfil.required(), nombre:nombre,descripcion:descripcion})

module.exports = {
    usuarioLoginSchema,usuarioSchema
}
