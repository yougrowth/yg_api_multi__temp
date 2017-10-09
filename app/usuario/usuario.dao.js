'use strict'

import Promise from 'bluebird'
import { genSaltSync, hashSync } from "bcrypt-nodejs";
import { getConnection } from "../../config/connection.config"

export default class UsuarioDAO {
  constructor() {
    this.conn = getConnection()
    Promise.promisifyAll(this.conn)
  }

  novo(usuario) {
    Object.assign(usuario, { senha: hashSync(usuario.senha, genSaltSync()) })
    
    const query = `INSERT INTO t_usuario SET 
      nome='${usuario.nome}',
      email='${usuario.email}',
      cidade='${usuario.cidade}',
      senha='${usuario.senha}'`
      
    return this.conn.queryAsync(query)
  }

  listaTodos() {
    return this.conn.queryAsync(`SELECT * FROM t_usuario`)
  }

  lista(usuario) {
    return this.conn.queryAsync(`SELECT * FROM t_usuario WHERE id=${usuario} LIMIT 1`)
  }

  listaPorEmail(email) {
    return this.conn.queryAsync(`SELECT * FROM t_usuario WHERE email='${email}' LIMIT 1`)
  } 
}