const exp = require('express');
const app = exp();
const modeloUsuario = require('./backend/models/usuario.model');
const logger = require('morgan');
const usuario = require('./backend/models/usuario.model');
require('dotenv').config();

app.use(logger('dev'));
//traer la dependencia morgan y se guarda en dependencia logger
app.use(exp.urlencoded({ extended:  false })); // Configura express para que pueda recibir datos en formato URL-encoded
app.use(exp.json()); // Configura express para que pueda recibir datos en formato JSON

app.get('/usuarios', async (req, res)=>{
    let listaUsuarios = await modeloUsuario.find();
    if(listaUsuarios)
        res.status(200).json(listaUsuarios);
    else
    res.status(400).json({error: "No se encontraron usuarios"})
});

//Buscar usuarios
app.get('/usuarios/:doc', async (req, res)=>{
    let usuarioEncontrado = await modeloUsuario.findOne({documento:req.params.doc});
    if(usuarioEncontrado)
        res.status(200).json(usuarioEncontrado);
    else
    res.status(400).json({"error": "No se encontraron usuarios"})
});
app.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en http:localhost:${process.env.PORT}`);
});
app.post('/usuarios', async (req, res) => {
    const nuevoUsuario = new modeloUsuario({
        documento: req.body.doc,
        nombreCompleto: req.body.name
    })
    nuevoUsuario.save()
        .then(usuario => {
            console.log(`usuario creado: ${usuario}`)
        })
        .catch(err => {
            console.error(`Error al crear usuario: ${err}`)
        })
        res.json("Registro exitoso") 
})
// Terminar de hacer patch
// app.patch('/usuarios', async (req, res)=>{
//     const productoEditado = {
//         documento: req.body.doc,
//         nombreCompleto: req.body.name
//     }
//     let insercion = await modeloUsuario.create(nuevoUsuario)
// })