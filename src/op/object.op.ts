import type { ObjectSchema } from 'joi'

export * from './any.op'

export const and = (...args: Parameters<ObjectSchema['and']>) => ({ and: args })
export const append = (...args: Parameters<ObjectSchema['append']>) => ({ append: args })
export const assert = (...args: Parameters<ObjectSchema['assert']>) => ({ assert: args })
export const instance = (...args: Parameters<ObjectSchema['instance']>) => ({ instance: args })
export const keys = (...args: Parameters<ObjectSchema['keys']>) => ({ keys: args })
export const length = (...args: Parameters<ObjectSchema['length']>) => ({ length: args })
export const max = (...args: Parameters<ObjectSchema['max']>) => ({ max: args })
export const min = (...args: Parameters<ObjectSchema['min']>) => ({ min: args })
export const nand = (...args: Parameters<ObjectSchema['nand']>) => ({ nand: args })
export const or = (...args: Parameters<ObjectSchema['or']>) => ({ or: args })
export const oxor = (...args: Parameters<ObjectSchema['oxor']>) => ({ oxor: args })
export const pattern = (...args: Parameters<ObjectSchema['pattern']>) => ({ pattern: args })
export const ref = (...args: Parameters<ObjectSchema['ref']>) => ({ ref: args })
export const regex = (...args: Parameters<ObjectSchema['regex']>) => ({ regex: args })
export const rename = (...args: Parameters<ObjectSchema['rename']>) => ({ rename: args })
export const schema = (...args: Parameters<ObjectSchema['schema']>) => ({ schema: args })
export const unknown = (...args: Parameters<ObjectSchema['unknown']>) => ({ unknown: args })
export const with_ = (...args: Parameters<ObjectSchema['with']>) => ({ with: args })
export const without = (...args: Parameters<ObjectSchema['without']>) => ({ without: args })
export const xor = (...args: Parameters<ObjectSchema['xor']>) => ({ xor: args })
