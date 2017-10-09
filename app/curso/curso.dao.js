'use strict'

import Promise from 'bluebird'
import { getConnection } from "../../config/connection.config"

export default class CursoDAO {
  constructor() {
    this.conn = getConnection()
    Promise.promisifyAll(this.conn)
  }

  novo(curso) {
    const query = `INSERT INTO t_curso SET 
      imagem=null,
      nome='${curso.nome}',
      descricao='${curso.descricao}',
      categoria='${curso.categoria}',
      nivel='${curso.nivel}',
      privacidade='${curso.privacidade}',
      preco=${curso.preco},
      duracao=${curso.duracao},
      autor=${curso.autor}`

    return this.conn.queryAsync(query)
  }

  listaTodos() {
    return this.conn.queryAsync(`SELECT * FROM t_curso`)
  }
}