const mongoose = require('mongoose');
const cadenaConexion ='mongodb://mongodb/drive'

//Conexion Base Datos

const conexion =  () =>{
 mongoose.connect(cadenaConexion, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
},(err) =>{
    if(err)
    {
        console.log('DB Error');
    }
    else
    {
        console.log('Conexion Correcta');
    }
})
}



module.exports = conexion;



