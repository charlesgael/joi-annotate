import 'reflect-metadata'

const OBJECT_KEY = Symbol('joi:object')

export function getObject(target: any): any | undefined {
  return Reflect.getMetadata(OBJECT_KEY, target.prototype)
}

export function setObject(target: any, attributes: any): void {
  Reflect.defineMetadata(OBJECT_KEY, attributes, target.prototype)
}
