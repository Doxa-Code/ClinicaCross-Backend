export class Autorizacao {
  public registroANS!: string
  public numeroGuia!: string
  public numeroGuiaPrincipal!: string
  public dataAutorizacao!: string
  public senha!: string
  public validadeSenha!: string
  public dataEmissao!: string

  constructor (props: Autorizacao) {
    Object.assign(this, props)
  }
}
