'use strict'

import { createConnection } from "mysql";

export const getConnection = () => createConnection(process.env.CLEARDB_DATABASE_URL)