
const express = require('express');
const Usuarios = require('../../src/entidades/usuarios')
const router = express.Router();

usuarios = new Usuarios();

//Get pruebas
router.get('/',

async (req,res, next) =>{

    console.log('Cramos Usuario');
    res.status(400).json('Prueba Nodemon');
})


//POST
router.post('/crearUsuario',  async (req,res, next) =>{
         
         const datos  = req.body;
         console.log(datos);
         const respuesta =   await usuarios.agregarUsuario(datos)
         if(respuesta=== undefined)
         {
             res.status(400).json('Error');
         }
         else
         {
             res.status(200).json('Exito');
         }
    
     })




// async (req,res, next) =>{

//     console.log('Cramos Usuario');
//     const { usuario,password} = req.body;
//     const respuesta =   await usuarios.agregarUsuario(usuario, password)
//     if(respuesta=== undefined)
//     {
//         res.status(400).json('Error');
//     }
//     else
//     {
//         res.status(200).json('Exito');
//     }

// })

module.exports = router;


