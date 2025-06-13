//Se inicia el módulo express con el fin de dar inicio al servidor, evitando varias configuraciones
const express = require('express');//se importa el paquete
const app = express();//se crea una instancia de express
const mongoose = require('mongoose');//se importa el paquete mongoose para la conexión a la base de datos
const bodyParser = require('body-parser');//se importa el paquete body-parser para manejar las peticiones

//llamar al body-parser para que pueda recibir datos en formato JSON
app.use(bodyParser.json());//se configura el body-parser para que pueda recibir datos en formato JSON

app.use(bodyParser.json()); // Configuración para recibir datos en formato JSON
//importar las rutas
const postRoutes = require('./routes/post'); // Importar las rutas de posts
app.use('/servicios', postRoutes);// Usar las rutas de posts en la ruta /posts
//Middlewares: Es la llamada a una función cuando se presenta un evento en una ruta especifica
/*app.use('servicios', () => {
    console.log('Middleware ejecutado');
});
*/



/*SE CREAN LAS RUTAS*/ 
app.get('/', (req, res) => {
    res.send('prueba 1 respuesta del servidor'); // Respuesta al cliente - Ruta por defecto
});

//Conexión a la BD
mongoose.connect('mongodb+srv://luisfgomez1:fMfFDZleBVc2K3sh@cluster0.vqxfzjh.mongodb.net/', 
    { useNewUrlParser: true, useUnifiedTopology: true });

//Se importa mongoose para la conexión a la base de datos

//primero se configura como va a escuchar el servidor las peticiones
app.listen(10000, () => {
    console.log('Servidor escuchando en el puerto 10000');
});