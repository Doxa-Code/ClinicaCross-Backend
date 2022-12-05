import { ProfissionalSolicitante } from "./ProfissionalSolicitante";
export class ContratadoSolicitante {
  public documentoSolicitante!: string
  public nome!: string
  public cnes!: string
  public profissionalSolicitante!: ProfissionalSolicitante

  constructor (props: ContratadoSolicitante) {
  Object.assign(this, props)
}
}