export interface IGetFinanceiroDTO {
  paciente?: string
  dateIn?: string
  dateOut?: string
  "pagamento.dataVencimento"?: {
    $gte?: string | undefined
    $lte?: string | undefined
  }
}
