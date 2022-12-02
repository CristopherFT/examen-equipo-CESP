var express = require('express');
var app = express();
const path = require('path');
app.use(express.json());
app.use(express.urlencoded());

var usuario = new Array ();


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/html/index.html'));
});

app.get('/crearEntrada', function (req, res) {
    res.sendFile(path.join(__dirname + '/html/crearEntrada.html'));
});

app.get('/actualizarDatos', function (req, res) {
    res.sendFile(path.join(__dirname + '/html/actualizarDatos.html'));
});

app.get('/salir', function (req, res) {
    res.sendFile(path.join(__dirname + '/html/index.html'));
});

app.get('/buscarDatos', function (req, res) {
    
    
    res.sendFile(path.join(__dirname + '/html/buscarDatos.html'));
    
});

app.post('/actualizar', function (req,res){
    const id = req.body.id;
    let actualizar = req.body;
    usuario.forEach(record => {
        if (record.id === id){
            record.nombre = actualizar.nombre;
            record.apellido = actualizar.apellido;
            record.edad = actualizar.edad;
        }
    });
    console.log('los datos del usuario se actualizaron'+ usuario);
    //alert('Datos Actualizados')
    res.sendFile(path.join(__dirname + '/html/index.html'));
});
app.post('/envioDeDatos', function (req, res) {
    var usuarioNombre = req.body.nombre;
    var usuarioApellido = req.body.apellido;
    var usuarioEdad= req.body.edad;
    var usuarioId = req.body.id;
    var envioDeDatos = { nombre: usuarioNombre ,apellido: usuarioApellido, edad: usuarioEdad,
         id: usuarioId};
    usuario.push(envioDeDatos);
    res.sendFile(path.join(__dirname + '/html/crearEntrada.html'));
});

app.get('/consultarDatos', function (req, res) {
    if (usuario.nombre !== '' && usuario.apellido !== '' && usuario.id !== '') {
        res.json(usuario);
    } else {
        res.send("Datos no ingresado");
    }
});

app.get('/eliminarDatos', function (req, res) {
    if (usuario.nombre !== '' && usuario.apellido !== '' && usuario.id !== '') {
        usuario.nombre = '';
        usuario.apellido = '';
        usuario.id = '';
        usuario.edad = '';
        res.sendFile(path.join(__dirname + '/html/datosEliminados.html'));
    } else {
        res.send("Datos no ingresado");
    }
});



app.listen(8000, function () {
    console.log('Servidor corriendo en el puerto 8000');
});