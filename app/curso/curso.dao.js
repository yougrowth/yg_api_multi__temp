'use strict'

import Promise from 'bluebird'
import { getConnection } from "../../config/connection.config"

export default class CursoDAO {
  constructor() {
    this.conn = getConnection()
    Promise.promisifyAll(this.conn)
  }

  endConnectionAndReturn(response) {
    this.conn.end()
    return response
  }

  joinAutor(resp) {
    const curso = Object.assign({}, {
      id: resp.id,
      nome: resp.nome,
      imagem: resp.imagem,
      descricao: resp.descricao,
      categoria: resp.categoria,
      nivel: resp.nivel,
      privacidade: resp.privacidade,
      preco: resp.preco,
      duracao: resp.duracao
    })
    return Object.assign(curso, { autor: {
      id: resp.id_autor,
      nome: resp.nome_autor || null,
      foto: resp.foto_autor || null,
      cidade: resp.cidade_autor || null,
      email: resp.email_autor || null
    }})
  }

  novo(curso) {
    let query = 'INSERT INTO t_curso SET '

    query += 'nome='          + (curso.nome        ? `'${ curso.nome }'`   : null)
    query += ', nivel='       + (curso.nivel       ? `'${ curso.nivel }'`  : null)
    query += ', imagem='      + (curso.imagem      ? `'${ curso.imagem }'` : null)
    query += ', descricao='   + (curso.descricao   ? `'${ curso.descricao }'`   : null)
    query += ', categoria='   + (curso.categoria   ? `'${ curso.categoria }'`   : null)
    query += ', privacidade=' + (curso.privacidade ? `'${ curso.privacidade }'` : null)
    query += ', preco='       + (curso.preco       ? curso.preco   : null)
    query += ', duracao='     + (curso.duracao     ? curso.duracao : null)
    query += ', autor='       + (curso.autor       ? curso.autor   : null)

    return this.conn.queryAsync(query)
      .then(resp => this.endConnectionAndReturn(resp))
  }

  listaTodos() {
    const query = `SELECT curso.*, autor.id as id_autor, autor.foto as foto_autor, autor.nome as nome_autor 
    FROM t_curso as curso
    JOIN t_usuario as autor on curso.autor = autor.id`

    return this.conn.queryAsync(query)
      .then(cursos => this.endConnectionAndReturn(cursos.map(curso => this.joinAutor(curso))))
  }
}