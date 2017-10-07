'use strict'

import { OK, UNAUTHORIZED, UNPROCESSABLE_ENTITY } from "http-status";

export const success = (data) => ({
  data: data,
  error: false,
  completed: new Date().toISOString()
})

export const err = (message) => 
  Object.assign(success({ message }), { error: true })