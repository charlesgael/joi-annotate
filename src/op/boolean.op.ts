import type { BooleanSchema } from 'joi'

export * from './any.op'

export const falsy = (...args: Parameters<BooleanSchema['falsy']>) => ({ falsy: args })
export const sensitive = (...args: Parameters<BooleanSchema['sensitive']>) => ({ sensitive: args })
export const truthy = (...args: Parameters<BooleanSchema['truthy']>) => ({ truthy: args })
