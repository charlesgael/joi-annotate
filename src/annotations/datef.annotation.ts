import type { AnySchema, DateSchema, SchemaInternals } from 'joi'
import Joi from 'joi'
import type { Diff, FunctionKeys } from 'utility-types'
import { addAttribute } from '~/services/attribute-service'
import { isDesignArray } from '~/services/model-service'
import * as d from '~/op/date.op'

type SchemaNoInternal = Diff<DateSchema, SchemaInternals>
type Keys = FunctionKeys<SchemaNoInternal>

type Options = {
  [K in Keys]: Parameters<SchemaNoInternal[K]>
}

type FChain = PropertyDecorator & {
  [K in Keys]: (...args: Parameters<SchemaNoInternal[K]>) => FChain
}

export function DateF(...args: Partial<Options>[]): FChain {
  const opts = args.reduce((acc, it) => ({ ...acc, ...it }), {})
  return new Proxy(() => {}, {
    apply(_t, _s, [target, key]: Parameters<PropertyDecorator>) {
      annotate(target, key as string, opts)
    },
    get(_, key, self) {
      const sfunc = (d as any)[key]
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
    .reduce((acc, [opt, arg]) => (acc as any)[opt](...arg), Joi.date())

  if (isDesignArray(target, propertyKey))
    item = Joi.array().items(item)

  addAttribute(target, propertyKey, item)
}
