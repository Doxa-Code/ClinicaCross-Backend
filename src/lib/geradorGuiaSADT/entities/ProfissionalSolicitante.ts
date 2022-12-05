export class ProfissionalSolicitante {
  public nome!: string
  public conselho!: string
  public numeroConselho!: string
  public ufConselho!: string
  public cbo!: string

  constructor (props:ProfissionalSolicitante) {
    Object.assign(this, props)
  }
}
