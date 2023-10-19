import type { AnySchema, ObjectSchema } from 'joi'
import Joi from 'joi'
import type { Class } from 'utility-types'
import { getAttributes } from './attribute-service'
import { getObject } from './object-service'

export function getJoiTypeByClass<T>(target: Class<T>): ObjectSchema<T> {
  const attributes: Record<string, AnySchema> = getAttributes(target.prototype)

  let res = Joi.object(attributes)

  const trans = getObject(target)
  if (typeof trans === 'function')
    res = trans(res)

  return res
}

export function getJoiTypeByDesignType(target: any, propertyName: string): AnySchema {
  const type = Reflect.getMetadata('design:type', target, propertyName)
  const dataType = inferDataType(type)

  if (dataType)
    return dataType

  throw new Error(`Specified type of property '${propertyName}'
            cannot be automatically resolved to a joi data type. Please
            define the data type manually`)
}

function inferDataType(e: Class<any>): AnySchema | undefined {
  if (e.prototype === String.prototype)
    return Joi.string()
  if (e.prototype === Number.prototype)
    return Joi.number()
  if (e.prototype === BigInt.prototype)
    return Joi.number()
  if (e.prototype === Boolean.prototype)
    return Joi.boolean()
  if (e.prototype === Symbol.prototype)
    return Joi.symbol()
  if (e.prototype === Date.prototype)
    return Joi.date()
}

export function isDesignArray(target: any, propertyName: string): boolean {
  const type = Reflect.getMetadata('design:type', target, propertyName)
  return type.prototype === Array.prototype
}
