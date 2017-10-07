'use strict'

import express, { Router } from "express"
import bodyParser from "body-parser"

import authRoute from "./app/auth/auth.route";

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/auth', authRoute(Router()))

app.listen(process.env.PORT || 3000, () => console.log('Listening on port 3000'))
