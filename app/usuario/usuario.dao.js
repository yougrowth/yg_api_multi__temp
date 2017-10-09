'use strict'

import Promise from 'bluebird'
import { genSaltSync, hashSync } from "bcrypt-nodejs";
import { getConnection } from "../../config/connection.config"

export default class UsuarioDAO {
  constructor() {
    this.conn = getConnection()
    Promise.promisifyAll(this.conn)
  }

  endConnectionAndReturn(response) {
    this.conn.end()
    return response
  }

  novo(usuario) {
    Object.assign(usuario, { senha: hashSync(usuario.senha, genSaltSync()) })
    
    let query = 'INSERT INTO `t_usuario` SET '
    query += 'nome='     + (usuario.nome   ? `'${ usuario.nome }'`   : null)
    query += ', foto='   + (usuario.foto   ? `'${ usuario.foto }'`   : '\'avatar.jpg\'')
    query += ', cidade=' + (usuario.cidade ? `'${ usuario.cidade }'` : null)
    query += ', email='  + (usuario.email  ? `'${ usuario.email }'`  : null)
    query += ', senha='  + (usuario.senha  ? `'${ usuario.senha }'`  : null)

    return this.conn
      .queryAsync(query)
      .then(resp => this.endConnectionAndReturn(Object.assign(usuario, { id: resp.insertId })))
  }

  listaTodos() {
    return this.conn
      .queryAsync(`SELECT * FROM t_usuario`)
      .then(resp => this.endConnectionAndReturn(resp))
  }

  lista(usuario) {
    return this.conn
      .queryAsync(`SELECT * FROM t_usuario WHERE id=${usuario} LIMIT 1`)
      .then(resp => this.endConnectionAndReturn(resp))
  }

  listaPorEmail(email) {
    return this.conn
      .queryAsync(`SELECT * FROM t_usuario WHERE email='${email}' LIMIT 1`)
      .then(resp => this.endConnectionAndReturn(resp))
  } 
}