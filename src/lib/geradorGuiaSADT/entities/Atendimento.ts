export class Atendimento {
  public tipoAtendimento!: string
  public indicacaoAcidente!: string
  public tipoSaida!: string

  constructor (props: Atendimento) {
    Object.assign(this, props)
  }
}
