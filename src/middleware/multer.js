const multer = require('multer');

var directorio = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./archivos')
    },
    filename: function  (req,file,cb)
    {
        cb(null, file.filename + '-' + Datetime.now());
    }
})
const subir = multer({storage : directorio});


module.exports = subir;