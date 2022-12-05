import { Procedimento } from "./Procedimento";
import { Medico } from "./Medico";
import { Agendamento } from "./Agendamento";
import { Paciente } from "./Paciente";
interface ICabecalho {
  identificacaoTransacao: {
    sequencialTransacao: string
  }
}

interface IPrestadorParaOperadora {
  loteGuias: {
    numeroLote: string
    guiasTISS: IGuiaSADT[]
  }
}

export interface IGuiaSADT {
  _id?: string;
  "guiaSP-SADT": {
    cabecalhoGuia: {
      numeroGuiaPrestador: string
      guiaPrincipal: string
    }
    dadosAutorizacao: {
      numeroGuiaOperadora: string
      dataAutorizacao: string
      senha: string
      dataValidadeSenha: string
    }
    dadosBeneficiario: Paciente,
    dadosSolicitante: {
      profissionalSolicitante: Medico
    }
    dadosSolicitacao: Agendamento
    dadosAtendimento: {
      tipoAtendimento: string
      indicacaoAcidente: string
      tipoConsulta: string
      motivoEncerramento: string
    }
    outrasDespesas: {
      despesa: IDespesa[]
    }
    observacao: string
    valorTotal: {
      valorProcedimentos: string
      valorDiarias: string
      valorTaxasAlugueis: string
      valorMateriais: string
      valorMedicamentos: string
      valorOPME: string
      valorGasesMedicinais: string
      valorTotalGeral: string
    }
  }
}

interface IDespesa {
  procedimento: Procedimento
  quantidadeExecutada: string
  reducaoAcrescimo: string
  valorUnitario: string
  valorTotal: string
}

export class Faturamento {
  public cabecalho!: ICabecalho;
  public prestadorParaOperadora!: IPrestadorParaOperadora

  constructor (props: Faturamento) {
    Object.assign(this, props)
  }
}
