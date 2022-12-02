import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema
({  nombre:{ type: String, required: true},
    descripcion:{ type: String, required: true },
    canciones:[{titulo:{type: String, required: true},
                artista:{type: String, required: true},
                album:{type: String, required: true},
                anio:{type: String, required: true}}]

},
{
    timestamps: true,
    versionKey: false
})

const playlist = mongoose.model('Playlists', playlistSchema)

export default playlist