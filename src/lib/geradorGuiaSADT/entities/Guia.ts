import { Autorizacao } from "./Autorizacao";
import { Beneficiario } from "./Beneficiario";
import { ContratadoSolicitante } from "./ContratadoSolicitante";
import { Solicitacao } from "./Solicitacao";
import { ContratadoExecutante } from "./ContratadoExecutante";
import { Atendimento } from "./Atendimento";
import { ConsultaReferencia } from "./ConsultaReferencia";
import { ProcedimentosRealizados } from "./ProcedimentosRealizados";
import { OPMSolicitados } from "./OPMSolicitados";
import { OPMRealizados } from "./OPMRealizados";

export class Guia {
  public autorizacao!: Autorizacao
  public beneficiario!: Beneficiario
  public contratadoSolicitante!: ContratadoSolicitante
  public solicitacao!: Solicitacao
  public contratadoExecutante!: ContratadoExecutante
  public atendimento!: Atendimento
  public consultaReferencia?: ConsultaReferencia
  public procedimentosRealizados!: ProcedimentosRealizados
  public opmSolicitados!: OPMSolicitados
  public opmRealizados!: OPMRealizados

  constructor (props: Guia) {
    Object.assign(this, props)
  }
}
