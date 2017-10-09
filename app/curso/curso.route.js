'use strict'

import CursoDAO from "./curso.dao";
import { CREATED, OK, UNPROCESSABLE_ENTITY } from "http-status";
import { decode } from "jwt-simple";

export const cursoRoute = router => {
  router
    .route('/')
    .post((req, res) => {
      const cursoDAO = new CursoDAO()
      console.log(req.get('Authorization'))
      const usuario = decode(req.get('Authorization'), process.env.JWT_KEY)
      const curso = Object.assign(req.body, { autor: usuario.id })

      cursoDAO
        .novo(req.body)
        .then(resp => res.status(CREATED).json(Object.assign(curso, { id: resp.insertId })))
        .catch(err => {
          console.log(err)
          res.status(UNPROCESSABLE_ENTITY).json({ message: 'Não foi possível criar o curso' })
        })
    })
    .get((req, res) => {
      const cursoDAO = new CursoDAO()

      cursoDAO
        .listaTodos()
        .then(resp => res.status(OK).json(resp))
        .catch(err => {
          console.log(err)
          res.status(UNPROCESSABLE_ENTITY).json({ message: 'Não foi possível carregar os cursos' })
        })
    })

  return router
}