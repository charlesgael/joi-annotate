import type { NumberSchema } from 'joi'

export * from './any.op'

export const greater = (...args: Parameters<NumberSchema['greater']>) => ({ greater: args })
export const integer = (...args: Parameters<NumberSchema['integer']>) => ({ integer: args })
export const less = (...args: Parameters<NumberSchema['less']>) => ({ less: args })
export const max = (...args: Parameters<NumberSchema['max']>) => ({ max: args })
export const min = (...args: Parameters<NumberSchema['min']>) => ({ min: args })
export const multiple = (...args: Parameters<NumberSchema['multiple']>) => ({ multiple: args })
export const negative = (...args: Parameters<NumberSchema['negative']>) => ({ negative: args })
export const port = (...args: Parameters<NumberSchema['port']>) => ({ port: args })
export const positive = (...args: Parameters<NumberSchema['positive']>) => ({ positive: args })
export const precision = (...args: Parameters<NumberSchema['precision']>) => ({ precision: args })
export const sign = (...args: Parameters<NumberSchema['sign']>) => ({ sign: args })
export const unsafe = (...args: Parameters<NumberSchema['unsafe']>) => ({ unsafe: args })
