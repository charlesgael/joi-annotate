import type { AnySchema, NumberSchema, SchemaInternals } from 'joi'
import Joi from 'joi'
import type { Diff, FunctionKeys } from 'utility-types'
import { addAttribute } from '~/services/attribute-service'
import { isDesignArray } from '~/services/model-service'
import * as n from '~/op/number.op'

type SchemaNoInternal = Diff<NumberSchema, SchemaInternals>
type Keys = FunctionKeys<SchemaNoInternal>

type Options = {
  [K in Keys]: Parameters<SchemaNoInternal[K]>
}

type FChain = PropertyDecorator & {
  [K in Keys]: (...args: Parameters<SchemaNoInternal[K]>) => FChain
}

export function NumberF(...args: Partial<Options>[]): FChain {
  const opts = args.reduce((acc, it) => ({ ...acc, ...it }), {})
  return new Proxy(() => {}, {
    apply(_t, _s, [target, key]: Parameters<PropertyDecorator>) {
      annotate(target, key as string, opts)
    },
    get(_, key, self) {
      const sfunc = (n as any)[key]
      if (typeof sfunc === 'function') {
        return (...args: any[]) => {
          Object.assign(opts, sfunc(...args))
          return self
        }
      }
    },
  }) as any
}

function annotate(target: any, propertyKey: string, options: Partial<Options> = {}) {
  let item: AnySchema = Object.entries(options)
    .reduce((acc, [opt, arg]) => (acc as any)[opt](...arg), Joi.number())

  if (isDesignArray(target, propertyKey))
    item = Joi.array().items(item)

  addAttribute(target, propertyKey, item)
}
