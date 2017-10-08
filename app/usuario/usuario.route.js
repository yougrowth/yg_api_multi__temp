'use strict'

import UsuarioDAO from "./usuario.dao"
import { OK, UNPROCESSABLE_ENTITY, UNAUTHORIZED, CREATED, BAD_REQUEST } from "http-status"
import { compareSync } from "bcrypt-nodejs";
import { encode } from "jwt-simple";

export const usuarioRoute = router => {
  router
    .route('/')
    .post((req, res) => {
      const usuarioDAO = new UsuarioDAO()

      usuarioDAO  
        .novo(req.body)
        .then(resp => res.status(CREATED).json({ id: resp.insertId }))
        .catch(err => {
          console.error(err)
          res.status(BAD_REQUEST).json({ message: 'Não foi possível criar o usuário' })
        })
    })
    .get((req, res) => {
      const usuarioDAO = new UsuarioDAO()

      usuarioDAO
        .listaTodos()
        .then(resp => res.status(OK).json(resp))
        .catch(err => {
          console.error(err)
          res.status(UNPROCESSABLE_ENTITY).json({ message: 'Não foi possível listar os usuários'})
        })
    })
    .put((req, res) => {
      const usuarioDAO = new UsuarioDAO()
      const usuario = req.body

      usuarioDAO
        .atualizar(usuario)
        .then(resp => res.sendStatus(OK))
        .catch(err => {
          console.log(err)
          res.status(UNPROCESSABLE_ENTITY).json({ message: 'Não foi possível atualizar o usuário'})
        })
    })

  router
    .route('/:id')
    .get((req, res) => {
      const usuarioDAO = new UsuarioDAO()

      usuarioDAO
        .lista(req.params.id)
        .then(resp => res.status(OK).json(resp[0]))
        .catch(err => {
          console.error(err)
          res.status(UNPROCESSABLE_ENTITY).json({ message: 'Usuário não encontrado'})
        })
    })

  router
    .route('/auth')
    .post((req, res) => {
      const usuarioDAO = new UsuarioDAO()
      
      usuarioDAO
        .listaPorEmail(req.body.email)
        .then(usuario => {
          if (!usuario[0] || !compareSync(req.body.senha, usuario[0].senha))
            res.status(UNAUTHORIZED).json({ message: 'Email ou senha inválidos' })
          else
            res.status(OK).json({ token: encode({ id: usuario.id }, process.env.JWT_KEY) })
        })
        .catch(err => {
          console.error(err)
          res.status(UNAUTHORIZED).json({ message: 'Email ou senha inválidos' })
        })
    })

  return router
}
