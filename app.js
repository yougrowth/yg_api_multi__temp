'use strict'

import path from 'path'
import dotenv from "dotenv"
import express, { Router } from "express"
import bodyParser from "body-parser"

import { usuarioRoute } from "./app/usuario/usuario.route";

if (process.env.NODE_ENV !== 'prod') {
  dotenv.config({ path: path.join(__dirname, './env/dev.env') })
}

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/usuario', usuarioRoute(Router()))

app.listen(process.env.PORT || 3000, () => console.log('Listening on port 3000'))
