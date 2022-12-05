export class OPM {
  public codigoTabela!: string
  public codigo!: string
  public descricao!: string
  public quantidade!: string
  public fabricante!: string
  public codigoDeBarras!: string
  public valorUnitario!: string
  public valorTotal!: string
  public valorTotalOPM!: string

  constructor (props: OPM) {
    Object.assign(this, props)
  }
}
