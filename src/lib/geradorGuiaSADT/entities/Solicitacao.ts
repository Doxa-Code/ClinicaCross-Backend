import { Procedimento } from "./Procedimento";
export class Solicitacao {
  public dataHora!: string
  public carater!: string
  public cid10!: string
  public indicacao!: string
  public procedimentos!: Procedimento[]

  constructor (props: Solicitacao) {
    Object.assign(this, props)
  }
}
