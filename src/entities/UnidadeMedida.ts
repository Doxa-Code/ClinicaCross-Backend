export class UnidadeMedida {
  public codigo!: string
  public descricao!: string
  
  constructor(props: UnidadeMedida){
    Object.assign(this, props)
  }
}