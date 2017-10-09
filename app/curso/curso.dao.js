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
    const query = `SELECT curso.*, autor.id as id_autor, autor.nome as nome_autor FROM t_curso as curso
    JOIN t_usuario as autor on curso.autor = autor.id`

    return this.conn.queryAsync(query)
      .then(cursos => cursos.map(curso => ({ 
          id: curso.id, 
          imagem: curso.imagem, 
          descricao: curso.descricao,
          categoria: curso.categoria,
          nivel: curso.nivel,
          privacidade: curso.privacidade,
          preco: curso.preco,
          duracao: curso.duracao,
          autor: {
            id: curso.id_autor,
            nome: curso.nome_autor
          }
        })))
  }
}