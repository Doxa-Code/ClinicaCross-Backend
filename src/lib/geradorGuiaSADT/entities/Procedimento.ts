export class Procedimento {
  public codigoTabela!: string
  public codigo!: string
  public nome!: string
  public qtdSolicitada!: string
  public qtdAutorizada!: string
  public data!: string
  public horaInicial!: string
  public horaFinal!: string
  public qtdRealizada!: string
  public viaAcesso!: string
  public tecnica!: string
  public reducaoAcrescimoPct!: string
  public valorUnitario!: string
  public valorTotal!: string

  constructor (props: Procedimento) {
    Object.assign(this, props)
  }
}
