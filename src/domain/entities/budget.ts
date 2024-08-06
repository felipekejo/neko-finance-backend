import { randomUUID } from 'node:crypto'

export class Budget {
  public id: string
  public name: string
  public ownerId: string

  constructor(name: string, ownerId: string, id?: string) {
    this.id = id ?? randomUUID()
    this.name = name
    this.ownerId = ownerId
  }
}
