//importa dependencia de la biblioteca express
import express, { json } from 'express'

//crea la aplicacion 
const app = express()

//lee el body en formato json
app.use(json())

//define un puerto en que va a escuchar reqs
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
app.get('/lists', (req, res) => {
    res.send(playlist)
})
app.get('/lists/:nombre', (req, res) => {
    let nombre = req.params.nombre
    let resultado = playlist.find(x => x.nombre == nombre)
    if (resultado.playlist != 1) {
        res.status(404).send(resultado)
        return
    }
    res.send(resultado)
})

app.post('/lists', (req, res) => {
    console.log(req.body)
    if (req.body.nombre != "") {
        playlist.push(req.body)
        res.status(201).send(req.body)
    }
    else
        res.status(400).send("Insertar nombre")
})

app.put('/lists/:nombre', (req, res) => {
    let nombre = req.params.nombre
    if (nombre != req.body.nombre) {
        res.status(409).send()
    }
    let playlists = playlist.find(x => x.nombre == nombre).at(0)
    if (playlists != null) {
        playlists.descripcion = req.body.descripcion
        res.status(204).send(playlists)
    }
    else
        res.status(404).send("La lista no existe")
})


app.delete('/lists/:nombre', (req, res) => {
    let nombre = req.params.nombre
    let listaAEliminar = playlist.find(x => x.nombre == nombre).at(0)
    if (listaAEliminar == null) {
        res.status(404).send("No se encuentra la lista de reproducción")
    }
    else {
        let indice = playlist.indexOf(listaAEliminar)
        playlist.splice(indice, 1)
        res.send("Se elimino la lista de reproducción")
    }
});








//2

app.get('/lists/:nombre/canciones', (req, res) => {
    let nombre = req.params.nombre
    let cancioneslistas = playlist.find(x => x.nombre == nombre).at(0)
    let cancioneslistasq = playlist.some(x => x.nombre == nombre)
    if (cancioneslistasq == true) {
        var a = cancioneslistas.canciones
        res.send(a)

    }
    else {
        res.status(404).send("lista de la cancion no existe")
    }
})

app.post('/lists/:nombre/canciones', (req, res) => {
    let nombre = req.params.nombre
    let listaCanciones = playlist.find(x => x.nombre == nombre).at(0)
    if (listaCanciones != null) {
        if(req.body.titulo != null){
            
            listaCanciones.canciones.push(req.body)
            console.log(listaCanciones.canciones)
            playlist.push(listaCanciones)
            res.send(listaCanciones)
        }
        else{
        res.status(404).send("listaCanciones no valida")

        }
    }
    else {
        res.status(400).send("listaCanciones no valida")

    }


    app.put('/playlists/:nombre/canciones/:titulo', (req, res) => {
        let name = req.params.nombre
        let titulo = req.params.titulo
        let song = playlist.find(x => x.nombre == name).at(0)
        if(song != null)
        {
        let cancion = song.canciones.find(x => x.titulo == titulo).at(0)
            if(cancion != null)
            {
                cancion.Artista = req.body.Artista
                cancion.Album = req.body.Album
                cancion.año = req.body.año
                res.send(cancion)
            }
            else
            {
                res.status(404).send()
            }
            
        }
        else
        {
            res.status(404),send()
        }
        })

        app.delete('/playlists/:nombre/canciones/:titulo', (req, res) => {
            let name = req.params.nombre
            let titulo = req.params.titulo
            let song = playlist.find(x => x.nombre == name).at(0)
            if(song != null)
            {
            let cancion = song.canciones.find(x => x.titulo == titulo).at(0)
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
                    res.send()
                }
                else
                {
                    res.status(404).send()
                }
                
            }
            else
            {
                res.status(404),send()
            }
            })
})

app.listen() 
