'use strict'

import UsuarioDAO from "./usuario.dao"
import { OK, UNPROCESSABLE_ENTITY, UNAUTHORIZED, CREATED, BAD_REQUEST } from "http-status"
import { compareSync } from "bcrypt-nodejs";
import { encode } from "jwt-simple";

export const usuarioRoute = router => {
  const usuarioDAO = new UsuarioDAO()

  router
    .route('/')
    .post((req, res) => {
      usuarioDAO  
        .novo(req.body)
        .then(resp => res.status(CREATED).json({ id: resp.insertId }))
        .catch(err => res.status(BAD_REQUEST)
          .json({ message: 'Não foi possível criar o usuário' }))
    })
    .get((req, res) => {
      usuarioDAO
        .listaTodos()
        .then(resp => res.status(OK).json(resp))
        .catch(err => res.status(UNPROCESSABLE_ENTITY)
          .json({ message: 'Não foi possível listar os usuários'}))
    })

  router
    .route('/:id')
    .get((req, res) => {
      usuarioDAO
        .lista(req.params.id)
        .then(resp => res.status(OK).json(resp[0]))
        .catch(err => res.status(UNPROCESSABLE_ENTITY).json({ message: 'Usuário não encontrado'}))
    })

  router
    .route('/auth')
    .post((req, res) => {
      usuarioDAO
        .listaPorEmail(req.body.email)
        .then(usuario => {
          if (compareSync(req.body.senha, usuario[0].senha))
            res.status(OK).json({ token: encode({ id: usuario.id }, process.env.JWT_KEY) })
          else
            res.status(UNAUTHORIZED).json({ message: 'Email ou senha inválidos' })
        })
        .catch(err => res.status(UNAUTHORIZED).json({ message: 'Email ou senha inválidos' }))
    })

  return router
}
