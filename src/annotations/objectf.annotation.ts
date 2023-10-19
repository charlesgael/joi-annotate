import type { ObjectSchema, SchemaInternals } from 'joi'
import 'reflect-metadata'
import type { Diff, FunctionKeys } from 'utility-types'
import * as o from '~/op/object.op'
import { setObject } from '~/services/object-service'

type SchemaNoInternal = Diff<ObjectSchema, SchemaInternals>
type Keys = FunctionKeys<SchemaNoInternal>

type Options = {
  [K in Keys]: Parameters<SchemaNoInternal[K]>
}

type FChain = ClassDecorator & {
  [K in Keys]: (...args: Parameters<SchemaNoInternal[K]>) => FChain
}

export function ObjectF(...args: Partial<Options>[]): FChain {
  const opts = args.reduce((acc, it) => ({ ...acc, ...it }), {})
  return new Proxy(() => {}, {
    apply(_t, _s, [target]: Parameters<ClassDecorator>) {
      annotate(target, opts)
    },
    get(_, key, self) {
      const sfunc = (o as any)[key]
      if (typeof sfunc === 'function') {
        return (...args: any[]) => {
          Object.assign(opts, sfunc(...args))
          return self
        }
      }
    },
  }) as any
}

// export function ObjectF(...args: Partial<Options>[]): ClassDecorator {
//   return (target) => {
//     annotate(target, args.reduce((acc, it) => ({...acc, ...it}), {}))
//   }
// }

function annotate(target: any, options: Partial<Options> = {}) {
  setObject(target, (schema: ObjectSchema<any>) => {
    return Object.entries(options)
      .reduce((acc, [k, arg]) => (acc as any)[k](...arg), schema)
  })
}
