'use strict'

import { encode } from "jwt-simple";
import { OK, UNAUTHORIZED } from "http-status";
import { err, success } from '../../utils/response_builder'

const authRouter = (router) => {
  router
    .route('/')
    .post((req, res) => {
      const { email, senha } = req.body

      console.log(req.body)
      
      if (email && senha)
        res.status(OK).json(success({ token: encode({ email, senha}, 'CHURR0S') }))
      else
        res.status(UNAUTHORIZED).json(err('Email ou senha inválidos'))
    })

  return router
}

export default authRouter
