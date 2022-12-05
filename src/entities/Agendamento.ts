import { Procedimento } from "./Procedimento";
import { Convenio } from "./Convenio";
import { FormaDePagamento } from "./FormaDePagamento";


export class Recibo {
  public readonly _id!: string;
  public responsavel!: any;
  public data!: string;

  constructor (props: Recibo) {
    Object.assign(this, props)
  }
}

export class Pagamento {
  public readonly _id!: string;
  public formaPagamento!: FormaDePagamento | any;
  public numeroParcela!: number;
  public qtdParcelas!: number;
  public valor!: string;
  public dataVencimento!: string;
  public status!: "Pago" | "Em aberto";
  public responsavel!: any;

  constructor (props: Pagamento) {
    Object.assign(this, props)
  }
}

export class Agendamento {
  public readonly _id!: string;
  public indicacaoClinica?: string;
  public codigo!: string;
  public paciente!: any;
  public bloqueio!: boolean;
  public encaixe!: boolean;
  public responsavel!: string;
  public convenio!: string;
  public procedimento!: Procedimento;
  public medico!: string;
  public numeroCarteira!: string
  public validadeCarteira!: string
  public valor!: string;
  public quantidade!: string;
  public procedimentoHonorario!: string;
  public procedimentoFilme!: string;
  public repasse!: string;
  public observacao!: string;
  public inicio!: string;
  public fim!: string;
  public historico!: Agendamento[];
  public pagamento!: Pagamento[];
  public recibo!: Recibo[];
  public caraterAtendimento!: 1 | 2;
  public status!: 'Agendado' | 'Confirmado' | 'Chegou' | 'Cancelado' | 'Realizado';
  public faturado!: boolean;

  constructor (props: Agendamento) {
    Object.assign(this, props)
  }
}
