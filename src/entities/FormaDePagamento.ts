export class FormaDePagamento {
  public readonly _id!: string;
  public nome!: string
  public divide!: boolean

  constructor (props: FormaDePagamento) {
    Object.assign(this, props)
  }
}
