interface IProcedimento {
  _id: string
  valorHonorario: string
  valorFilme: string
}

export class Convenio {
  public codigo!: string
  public thumbnail!: string
  public numero!: number
  public nome!: string
  public geraRecibo!: boolean
  public carteira!: boolean
  public procedimentos!: IProcedimento[]

  constructor(props: any) {
    Object.assign(this, props)
  }
}