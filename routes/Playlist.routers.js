import express from 'express'
import playlist from '../models/playlist.models'

const router = express.Router()

import {LeerPLaylists, LeerPorNombre, CrearPlaylists, 
    ActualizarPlaylists, BorrarPlaylists, LeerCanciones,
    LeerPorTitulo, CrearCancion, ActualizarCancion, 
    BorrarCancion} from '../controllers/playlists.controllers.js'

/*
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

    }]*/
//endpoints
router.get('/playlists', LeerPLaylists)

router.get('/playlists/:nombre', LeerPorNombre)

router.post('/playlists', CrearPlaylists)

router.put('/playlists/:nombre', ActualizarPlaylists)

router.delete('/playlists/:nombre',BorrarPlaylists)
    
    
    // endpoints P2
router.get('/playlists/:nombre/canciones', LeerCanciones)

router.get('/playlists/:nombre/canciones/:titulo', LeerPorTitulo)

router.post('/playlists/:nombre/canciones', CrearCancion)

router.put('/playlists/:nombre/canciones/:titulo', ActualizarCancion)

router.delete('/playlists/:nombre/canciones/:titulo', BorrarCancion)

export default router