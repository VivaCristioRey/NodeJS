const mongoose = require('mongoose');

// se importa la uri de mongo, y se reemplaza el usuario y contraseña por las variables de entorno en .env
const URI =`mongodb+srv://chrisjara0626:Edqbau7aSDXOBKB5@cluster0.muiaekd.mongodb.net/APIRESTful`

// Conecta a la base de datos MongoDB utilizando Mongoose
mongoose.connect(URI);

module.exports = mongoose;
// Exporta el objeto mongoose para que pueda ser utilizado en otros archivos de la aplicación