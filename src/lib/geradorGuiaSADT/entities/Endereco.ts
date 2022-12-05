export class Endereco {
  public tipoLogradouro!: string
  public logradouro!: string
  public numero!: string
  public complemento!: string
  public municipio!: string
  public uf!: string
  public codigoIbgeMunicipio!: string
  public cep!: string

  constructor (props: Endereco) {
    Object.assign(this, props)
  }
}
