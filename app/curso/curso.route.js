'use strict'

import CursoDAO from "./curso.dao";
import { CREATED, OK, UNPROCESSABLE_ENTITY } from "http-status";

export const cursoRoute = router => {
  router
    .route('/')
    .post((req, res) => {
      const cursoDAO = new CursoDAO()

      cursoDAO
        .novo(req.body)
        .then(resp => res.status(CREATED).json(Object.assign(req.body, { id: resp.insertId })))
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