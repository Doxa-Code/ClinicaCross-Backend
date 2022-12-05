export class Servico {
  public codigoDespesa!: string
  public codigoTabela!: string
  public codigoProcedimento!: string
  public descricao!: string
  
  constructor(props: Servico){
    Object.assign(this, props)
  }
}