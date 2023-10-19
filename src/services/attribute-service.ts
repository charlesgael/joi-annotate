import 'reflect-metadata'

const ATTRIBUTES_KEY = Symbol('joi:attributes')

export function getAttributes(target: any): any | undefined {
  return Reflect.getMetadata(ATTRIBUTES_KEY, target)
}

export function setAttributes(target: any, attributes: any): void {
  Reflect.defineMetadata(ATTRIBUTES_KEY, { ...attributes }, target)
}

export function addAttribute(target: any, name: string, options: any): void {
  let attributes = getAttributes(target)

  if (!attributes)
    attributes = {}

  attributes[name] = options

  setAttributes(target, attributes)
}
