export class Configuracao {
  public tipoTransacao!: string
  public codigoPrestadorNaOperadora!: string
  public registroANS!: string
  public versaoPadrao!: string
  public nomeContratado!: string
  public CNES!:string
  public cnpj!:string
  public inicio!:string
  public fim!:string
  public bloco!:number
  public tipoLogradouro!: string
  public logradouro!: string
  public numero!: string
  public complemento!: string
  public municipio!: string
  public uf!: string
  public codigoIbgeMunicipio!: string
  public cep!: string

  constructor (props: Configuracao) {
    Object.assign(this, props)
  }
}
