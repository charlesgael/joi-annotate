import type { AnySchema } from 'joi'
import type { Class } from 'utility-types'

export interface FieldConfig {
  type: AnySchema
  clazz: () => Class<any>
  items: (() => Class<any>) | AnySchema
}
