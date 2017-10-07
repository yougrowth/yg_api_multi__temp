'use strict'

import { encode } from "jwt-simple";
import { OK, UNAUTHORIZED } from "http-status";

const authRouter = (router) => {
  router
    .route('/')
    .post((req, res) => {
      const { email, senha } = req.body
      
      if (email && senha)
        res.status(OK).json({ token: encode({ email, senha}, 'CHURR0S') })
      else
        res.status(UNAUTHORIZED).json({ message: 'Email ou senha inválidos' })
    })

  return router
}

export default authRouter
