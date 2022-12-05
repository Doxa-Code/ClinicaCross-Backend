interface IEndereco {
  tipoLogradouro: string
  logradouro: string
  numero: string
  complemento: string
  municipio: string
  codigoIbgeMunicipio: string
  uf: string,
  cep: string
}

export class ContratadoExecutante {
  public documentoExecutante!: string
  public nome!: string
  public endereco!: IEndereco
  public cnes!: string
  public documentoComplementar!: string
  public nomeComplementar!: string
  public conselho!: string
  public conselhoNumero!: string
  public conselhoUF!: string
  public cbo!: string
  public grauParticipacao!: string

  constructor (props:ContratadoExecutante) {
    Object.assign(this,props)
  }
}
