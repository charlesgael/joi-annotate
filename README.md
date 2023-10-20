# joi-annotate

[![npm version](https://badge.fury.io/js/joi-annotate.svg)](https://badge.fury.io/js/joi-annotate)
[![Build Status](https://github.com/charlesgael/joi-annotate/actions/workflows/bun-test.yml/badge.svg)](https://github.com/charlesgael/joi-annotate/actions/workflows/bun-test.yml)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

`joi-annotate` is a Node.js module that simplifies the process of creating Joi validators from class annotations. If you're using the Joi library for validation in your Node.js application, and you prefer to define validation rules within your class definitions, this module is for you.

## Installation

You can install `joi-annotate` via npm or yarn:

```sh
npm install joi-annotate --save
```

or

```sh
yarn add joi-annotate
```

## Usage

To use `joi-annotate`, you need to annotate your class with validation rules using special annotations. Here's a simple example:

```ts
import { BooleanF, DateF, NumberF, ObjectF, StringF } from 'joi-annotate'

@ObjectF()
  .unknown(false)
  .min(3)
class User {
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
```

In this example, we use the `BooleanF`, `DateF`, `NumberF`, `ObjectF` and `StringF` annotations to specify the validation rules for the User class properties.

ObjectF annotation is completely optional and only serve if you wish to add validation class wide.

Field ones are mandatory, at least the base one, then all calls are to append to the field validator.

Previous example would be same as

```ts
Joi.object({
  a: Joi.string().min(3).trim(),
  b: Joi.number().multiple(3),
  d: Joi.boolean().truthy('Y').falsy('N'),
  f: Joi.date().max('12-31-2020'),
}).unknown(false).min(3)
```

You can see that `Joi.string().min(3).trim()` translate to annotation `@StringF().min(3).trim()` for more simplicity.

You can then create a Joi validator for the `User` class like this:

```ts
import { getSchema } from 'joi-annotate'

const UserValidator = getSchema(User)
```

Now, you can use `UserValidator` to validate user objects.

```ts
const { error, value } = UserValidator.validate({ email: 'test@example.com', password: 'secret' })
if (error)
  console.error('Validation failed:', error)

else
  console.log('Validation passed:', value)
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Author

cdjedai

## Acknowledgments

Hat tip to the joi library maintainers for this awesome util.
