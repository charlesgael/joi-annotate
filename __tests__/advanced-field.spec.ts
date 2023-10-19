import Joi from 'joi'
import { BooleanF, DateF, NumberF, StringF, getSchema } from '~'

describe('basic scenario', () => {
  class PrimitiveContainer {
    @StringF()
      .min(3)
      .trim()
    a!: string

    @NumberF()
      .multiple(3)
    b!: number

    @BooleanF()
      .truthy('Y')
      .falsy('N')
    d!: boolean

    @DateF()
      .max('12-31-2020')
    f!: Date
  }

  it('simple test', () => {
    const val = getSchema(PrimitiveContainer)
    expect(val).toBeTruthy()
  })

  it('test joi equality', () => {
    const val = { ...getSchema(PrimitiveContainer) }
    const expected = { ...Joi.object({
      a: Joi.string().min(3).trim(),
      b: Joi.number().multiple(3),
      d: Joi.boolean().truthy('Y').falsy('N'),
      f: Joi.date().max('12-31-2020'),
    }) }

    expect(JSON.stringify(val)).toBe(JSON.stringify(expected))
  })
})
