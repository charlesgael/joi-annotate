import Joi from 'joi'
import { BooleanF, DateF, NumberF, StringF, getSchema } from '~'

describe('basic scenario', () => {
  class PrimitiveContainer {
    @StringF()
    a!: string

    @NumberF()
    b!: number

    @BooleanF()
    d!: boolean

    @DateF()
    f!: Date
  }

  it('simple test', () => {
    const val = getSchema(PrimitiveContainer)
    expect(val).toBeTruthy()
  })

  it('test joi equality', () => {
    const val = { ...getSchema(PrimitiveContainer) }
    const expected = { ...Joi.object({
      a: Joi.string(),
      b: Joi.number(),
      d: Joi.boolean(),
      f: Joi.date(),
    }) }

    expect(JSON.stringify(val)).toBe(JSON.stringify(expected))
  })
})
