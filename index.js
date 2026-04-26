require('dotenv').config();
console.log(process.env.JWT_SECRET);
const mongoose = require("mongoose");
const app = require("./app.js");
//const port = 3000; De normal puedo usar esto
const port = process.env.PORT || 3000;//Esto usaría o la variable de entorno o en el caso que no lo haya el puerto 3000
const urlMongoDb= "mongodb://pacodemi2000_db_user:vg6EkOp3y4laAJzg@ac-fh27f0e-shard-00-00.hhkx937.mongodb.net:27017,ac-fh27f0e-shard-00-01.hhkx937.mongodb.net:27017,ac-fh27f0e-shard-00-02.hhkx937.mongodb.net:27017/?ssl=true&replicaSet=atlas-yj0iww-shard-0&authSource=admin&appName=Cluster0"




mongoose.connect(urlMongoDb)
    .then(() => {
        console.log("La conexion a la base de datos es correcta");
        
        app.listen(port, () => {
            console.log(`Servidor funcionando en http://localhost:${port}`);
        });//Esto es lo que levanta el servidor.
    })
    .catch((err) => {
        console.error("Error al conectar a la base de datos:", err);
    });



