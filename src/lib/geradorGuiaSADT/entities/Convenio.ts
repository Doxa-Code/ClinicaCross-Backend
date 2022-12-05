export class Convenio {
  public numeroCarteira!: string
  public validadeCarteira!: string
  public nomeDoPlano!: string
  public logotipo!: any
  public nome!: string

  constructor (props: Convenio) {
    Object.assign(this, props)
  }
}
