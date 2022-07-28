const { date } = require('joi');
const multer = require('multer');

let nombreArchivo;

var directorio = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./archivos')
    },
    filename: function  (req,file,cb)
    {
        nombreArchivo = file.originalname + Date.now();
        cb(null, nombreArchivo);
    },
});
const subir = multer({storage : directorio});


module.exports =  subir
    
