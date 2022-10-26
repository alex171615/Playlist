const { request } = require('express')
const express = require('express')
const { send } = require('express/lib/response')
const res = require('express/lib/response')

//crea la aplicacion 
const app = express()

//lee el body en formato json
app.use(express.json())

//define un puerto en que va a escuchar pedidos
const port = 3000

var playlist = [
    {
        "nombre": "rock",
        "descripcion": "mas musica",
        "canciones": [
            {
                "titulo": "breed",
                "artista": "nirvana",
                "album": "nevermind",
                "año": 1992
            },
            {
                "titulo": "blady",
                "artista": "21 savage",
                "album": "2022t",
                "año": 2020
            }
        ]

    }]
//endpoints
app.get('/lists', (pedido, respuesta) => {
    respuesta.send(playlist)
})
app.get('/lists/:nombre', (pedido, respuesta) => {
    let nombre = pedido.params.nombre
    let resultado = playlist.filter(x => x.nombre == nombre)
    if (resultado.playlist != 1) {
        respuesta.status(404).send(resultado)
        return
    }
    respuesta.send(resultado)
})

app.post('/lists', (pedido, respuesta) => {
    console.log(pedido.body)
    if (pedido.body.nombre != "") {
        playlist.push(pedido.body)
        respuesta.status(201).send(pedido.body)
    }
    else
        respuesta.status(400).send("Insertar nombre")
})

app.put('/lists/:nombre', (pedido, respuesta) => {
    let nombre = pedido.params.nombre
    if (nombre != pedido.body.nombre) {
        respuesta.status(409).send()
    }
    let playlists = playlist.filter(x => x.nombre == nombre).at(0)
    if (playlists != null) {
        playlists.descripcion = pedido.body.descripcion
        respuesta.status(204).send(playlists)
    }
    else
        respuesta.status(404).send("La lista no existe")
})


app.delete('/lists/:nombre', (pedido, respuesta) => {
    let nombre = pedido.params.nombre
    let listaAEliminar = playlist.filter(x => x.nombre == nombre).at(0)
    if (listaAEliminar == null) {
        respuesta.status(404).send("No se encuentra la lista de reproducción")
    }
    else {
        let indice = playlist.indexOf(listaAEliminar)
        playlist.splice(indice, 1)
        respuesta.send("Se elimino la lista de reproducción")
    }
});




//p.2

app.get('/lists/:nombre/canciones', (pedido, respuesta) => {
    let nombre = pedido.params.nombre
    let cancioneslistas = playlist.filter(x => x.nombre == nombre).at(0)
    let cancioneslistasq = playlist.some(x => x.nombre == nombre)
    if (cancioneslistasq == true) {
        var a = cancioneslistas.canciones
        respuesta.send(a)

    }
    else {
        respuesta.status(404).send("lista de la cancion no existe")
    }
})

app.post('/lists/:nombre/canciones', (pedido, respuesta) => {
    let nombre = pedido.params.nombre
    let listaCanciones = playlist.filter(x => x.nombre == nombre).at(0)
    if (listaCanciones != null) {
        if(pedido.body.titulo != null){
            
            listaCanciones.canciones.push(pedido.body)
            console.log(listaCanciones.canciones)
            playlist.push(listaCanciones)
            respuesta.send(listaCanciones)
        }
        else{
        respuesta.status(404).send("listaCanciones no valida")

        }
    }
    else {
        respuesta.status(400).send("listaCanciones no valida")

    }


    app.put('/playlists/:nombre/canciones/:titulo', (pedido, respuesta) => {
        let name = pedido.params.nombre
        let titulo = pedido.params.titulo
        let song = playlists.filter(x => x.nombre == name).at(0)
        if(song != null)
        {
        let cancion = song.canciones.filter(x => x.titulo == titulo).at(0)
            if(cancion != null)
            {
                cancion.Artista = pedido.body.Artista
                cancion.Album = pedido.body.Album
                cancion.año = pedido.body.año
                respuesta.send(cancion)
            }
            else
            {
                respuesta.status(404).send()
            }
            
        }
        else
        {
            respuesta.status(404),send()
        }
        })

        app.delete('/playlists/:nombre/canciones/:titulo', (pedido, respuesta) => {
            let name = pedido.params.nombre
            let titulo = pedido.params.titulo
            let song = playlists.filter(x => x.nombre == name).at(0)
            if(song != null)
            {
            let cancion = song.canciones.filter(x => x.titulo == titulo).at(0)
                if(cancion != null)
                {
                    let indice = playlists.indexOf(song)
                    var indices = 0
                    playlists[indice].canciones.forEach((Element,i) =>
                    {
                        if(Element.titulo == titulo)
                        indices = i
                    })
                    playlist[indice].canciones.splice(indices,1)
                    respuesta.send()
                }
                else
                {
                    respuesta.status(404).send()
                }
                
            }
            else
            {
                respuesta.status(404),send()
            }
            })


})

app.listen() 
