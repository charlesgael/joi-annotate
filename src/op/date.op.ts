import type { DateSchema } from 'joi'

export * from './any.op'

export const greater = (...args: Parameters<DateSchema['greater']>) => ({ greater: args })
export const iso = (...args: Parameters<DateSchema['iso']>) => ({ iso: args })
export const less = (...args: Parameters<DateSchema['less']>) => ({ less: args })
export const max = (...args: Parameters<DateSchema['max']>) => ({ max: args })
export const min = (...args: Parameters<DateSchema['min']>) => ({ min: args })
export const timestamp = (...args: Parameters<DateSchema['timestamp']>) => ({ timestamp: args })
