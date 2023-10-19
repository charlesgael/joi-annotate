import type { ObjectSchema } from 'joi'
import 'reflect-metadata'
import type { Class } from 'utility-types'
import { getJoiTypeByClass } from './services/model-service'

export const getSchema = <T>(clazz: Class<T>): ObjectSchema<T> => getJoiTypeByClass(clazz)

export * from './annotations'
