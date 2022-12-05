import { Procedimento } from "./../../../entities/Procedimento";
export interface IGetRelatorioDTO {
  paciente?: string
  convenio?: string
  medico?: string
  procedimento?: Procedimento
  dateIn?: string
  dateOut?: string
  inicio?: {
    $gte?: string
    $lte?: string
  }
}
