'use strict'

import { createConnection } from "mysql";

let conn = null

export const getConnection = () => {
  conn = createConnection(process.env.CLEARDB_DATABASE_URL)

  conn.on('error', err => {
    if (err.code === 'PROTOCOL_CONNECTION_LOST')
      getConnection()
    else
      console.log(err)
  })

  return conn
}