import { Procedimento } from "./Procedimento";

export class ProcedimentosRealizados {
  public procedimentos!: Procedimento[]
  public observacao!:string
  public totalProcedimentos!: string
  public totalTaxasAlugueis!: string
  public totalMateriais!: string
  public totalMedicamentos!: string
  public totalDiarias!: string
  public totalGases!: string
  public totalGuia!: string

  constructor (props: ProcedimentosRealizados) {
    Object.assign(this, props)
  }
}
