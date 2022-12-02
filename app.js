//importa dependencia de la biblioteca express
import express, { json } from 'express'
import morgan from 'morgan'
import 'dotenv/config'


const app = express()
const port = process.env.PORT

app.use(json())
app.use(morgan('dev'))
app.use(json())

app.listen() 
