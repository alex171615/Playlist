import express from 'express'
import playlist from '../models/playlist.models'

const router = express.Router()

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
router.get('/lists',(req, res) => {
    res.send(playlist)
})
router.get('/lists/:nombre', async (req, res) => {
    let nombre = req.params.nombre
    let resultado = await playlist.find(x => x.nombre == nombre)
    if (resultado.playlist != 1) {
        res.status(404).send(resultado)
        return
    }
    res.send(resultado)
})

router.post('/lists', (req, res) => {
    console.log(req.body)
    if (req.body.nombre != "") {
        playlist.push(req.body)
        res.status(201).send(req.body)
    }
    else
        res.status(400).send("Insertar nombre")
})

router.put('/lists/:nombre',async (req, res) => {
    let nombre = req.params.nombre
    if (nombre != req.body.nombre) {
        res.status(409).send()
    }
    let playlists = await playlist.find(x => x.nombre == nombre).at(0)
    if (playlists != null) {
        playlists.descripcion = req.body.descripcion
        res.status(204).send(playlists)
    }
    else
        res.status(404).send("La lista no existe")
})


router.delete('/lists/:nombre', async(req, res) => {
    let nombre = req.params.nombre
    let listaAEliminar = await playlist.find(x => x.nombre == nombre).at(0)
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

router.get('/lists/:nombre/canciones',async (req, res) => {
    let nombre = req.params.nombre
    let cancioneslistas = await playlist.find(x => x.nombre == nombre).at(0)
    let cancioneslistasq = playlist.some(x => x.nombre == nombre)
    if (cancioneslistasq == true) {
        var a = cancioneslistas.canciones
        res.send(a)

    }
    else {
        res.status(404).send("lista de la cancion no existe")
    }
})

router.post('/lists/:nombre/canciones', async (req, res) => {
    let nombre = req.params.nombre
    let listaCanciones = await playlist.find(x => x.nombre == nombre).at(0)
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


    router.put('/playlists/:nombre/canciones/:titulo', async (req, res) => {
        let name = req.params.nombre
        let titulo = req.params.titulo
        let song = await playlist.find(x => x.nombre == name).at(0)
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

        router.delete('/playlists/:nombre/canciones/:titulo', async(req, res) => {
            let name = req.params.nombre
            let titulo = req.params.titulo
            let song = await playlist.find(x => x.nombre == name).at(0)
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
export default router