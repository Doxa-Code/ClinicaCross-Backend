import { Convenio } from "./Convenio";
export class Beneficiario {
  public convenio!: Convenio
  public nome!: string
  public numeroCartaoNacionalSaude!: string
  public coParticipacao!: boolean

  constructor (props: Beneficiario) {
    Object.assign(this, props)
  }
}
