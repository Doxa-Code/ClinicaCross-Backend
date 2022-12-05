import { S3 } from "aws-sdk";
import { Agendamento } from "./../entities/Agendamento";
import { Medico } from "./../entities/Medico";
import { Procedimento } from "./../entities/Procedimento";
import { Convenio } from "./../entities/Convenio";
import { Configuracao } from "./../entities/Configuracao";
import { IGuiaSADT } from "./../entities/Faturamento";
import { Guia, GeradorGuiaSPSADT } from '../lib/geradorGuiaSADT'
import { format, isValid, parseISO } from "date-fns";

interface DTO {
  guia: IGuiaSADT | undefined,
  configuracao: Configuracao | null
}

export interface IGuiaSADTService {
  create(data: DTO): Promise<PDFKit.PDFDocument | undefined>
}

export class GuiaSADTService implements IGuiaSADTService {
  async create({ guia, configuracao }: DTO) {

    if (!guia || !configuracao) return 
    
    const guiaSADT = new GeradorGuiaSPSADT()

    const convenio = new Convenio(guia?.["guiaSP-SADT"].dadosSolicitacao.convenio)
    const procedimento = new Procedimento(guia?.["guiaSP-SADT"].dadosSolicitacao.procedimento)
    const medico = new Medico(guia?.["guiaSP-SADT"].dadosSolicitante.profissionalSolicitante)
    const agendamento = new Agendamento(guia["guiaSP-SADT"].dadosSolicitacao)
    const storage = new S3()
    const Key = convenio?.thumbnail?.split('/convenios/').pop() || ''   
    const params = {
      Bucket: process.env.BUCKET_NAME || '',
      Key: `convenios/${Key}`
    }
    const image: any = convenio.thumbnail ? await storage.getObject(params).promise() : ""

    const pdf = guiaSADT.gerarPdf(new Guia({
      atendimento: {
        indicacaoAcidente: guia["guiaSP-SADT"].dadosAtendimento.indicacaoAcidente,
        tipoAtendimento: guia["guiaSP-SADT"].dadosAtendimento.tipoAtendimento,
        tipoSaida: guia["guiaSP-SADT"].dadosAtendimento.tipoConsulta
      },
      autorizacao: {
        dataAutorizacao: format(parseISO(guia?.["guiaSP-SADT"].dadosAutorizacao.dataAutorizacao), "dd/MM/yyyy"),
        senha: guia?.["guiaSP-SADT"].dadosAutorizacao.senha,
        validadeSenha: format(parseISO(guia?.["guiaSP-SADT"].dadosAutorizacao.dataValidadeSenha), "dd/MM/yyyy"),
        numeroGuia: guia?.["guiaSP-SADT"].cabecalhoGuia.numeroGuiaPrestador,
        numeroGuiaPrincipal: guia?.["guiaSP-SADT"].cabecalhoGuia.guiaPrincipal,
        dataEmissao: format(new Date(), "dd/MM/yyyy"),
        registroANS: configuracao?.registroANS,
      },  
      beneficiario: {
        nome: guia?.["guiaSP-SADT"].dadosBeneficiario.nome || "",
        coParticipacao: false,
        convenio: {
          logotipo: image.Body || "",
          nome: convenio.nome || "",
          nomeDoPlano: "",
          numeroCarteira: guia?.["guiaSP-SADT"].dadosSolicitacao.numeroCarteira || "",
          validadeCarteira:  isValid(parseISO(guia?.["guiaSP-SADT"].dadosSolicitacao.validadeCarteira)) ? format(parseISO(guia?.["guiaSP-SADT"].dadosSolicitacao.validadeCarteira), "dd/MM/yyyy") : guia?.["guiaSP-SADT"].dadosSolicitacao.validadeCarteira,
        },
        numeroCartaoNacionalSaude: ""
      },
      contratadoExecutante: {
        cnes: configuracao.CNES,
        cbo:  "",
        conselho: "",
        conselhoNumero: "",
        conselhoUF: "",
        documentoComplementar: "",
        documentoExecutante: configuracao.codigoPrestadorNaOperadora,
        endereco: {
          cep: configuracao.cep,
          codigoIbgeMunicipio: configuracao.codigoIbgeMunicipio,
          complemento: configuracao.complemento,
          logradouro: configuracao.logradouro,
          municipio: configuracao.municipio,
          numero: configuracao.numero,
          tipoLogradouro: configuracao.tipoLogradouro,
          uf: configuracao.uf
        },
        grauParticipacao: "",
        nome: configuracao.nomeContratado,
        nomeComplementar: "",
      },
      contratadoSolicitante: {
        cnes:configuracao.CNES,
        documentoSolicitante: configuracao.codigoPrestadorNaOperadora,
        nome: configuracao.nomeContratado,
        profissionalSolicitante: {
          cbo: medico.cbos || "",
          conselho: medico.conselhoProfissional || "",
          nome: medico.nome || "",
          numeroConselho: medico.numeroConselhoProfissional || "",
          ufConselho: medico.UF || ""
        },
      },
      opmRealizados: { opms: [] },
      opmSolicitados: { opms: [] },
      procedimentosRealizados: {
        procedimentos: [{
          codigo: procedimento.codigoProcedimento || "",
          codigoTabela: procedimento.codigoTabela || "",
          data: isValid(parseISO(agendamento.inicio)) ? format(parseISO(agendamento.inicio), "dd/MM/yyyy") : agendamento.inicio,
          horaInicial: isValid(parseISO(agendamento.inicio)) ? format(parseISO(agendamento.inicio), "HH:mm") : agendamento.inicio,
          horaFinal: isValid(parseISO(agendamento.fim)) ? format(parseISO(agendamento.fim), "HH:mm") : agendamento.fim,
          nome: procedimento.descricaoProcedimento || "",
          qtdAutorizada: '1',
          qtdRealizada: '1',
          qtdSolicitada: '1',
          reducaoAcrescimoPct: '0',
          tecnica: '',
          valorTotal: agendamento.valor,
          valorUnitario: agendamento.procedimentoHonorario + agendamento.procedimentoFilme,
          viaAcesso: '',
        }],
        observacao: guia["guiaSP-SADT"].observacao,
        totalProcedimentos: guia["guiaSP-SADT"].valorTotal.valorProcedimentos,
        totalTaxasAlugueis: guia["guiaSP-SADT"].valorTotal.valorTaxasAlugueis,
        totalMateriais: guia["guiaSP-SADT"].valorTotal.valorMateriais,
        totalMedicamentos: guia["guiaSP-SADT"].valorTotal.valorMedicamentos,
        totalDiarias: guia["guiaSP-SADT"].valorTotal.valorDiarias,
        totalGases: guia["guiaSP-SADT"].valorTotal.valorGasesMedicinais,
        totalGuia: guia["guiaSP-SADT"].valorTotal.valorTotalGeral
      },
      solicitacao: {
        dataHora: format(new Date(), "dd/MM/yyyy HH:mm"),
        carater: agendamento.caraterAtendimento ? "E" : "U",
        procedimentos: [{
          codigo: procedimento.codigoProcedimento || "",
          codigoTabela: procedimento.codigoTabela || "",
          data: isValid(parseISO(agendamento.inicio)) ? format(parseISO(agendamento.inicio), "dd/MM/yyyy") : agendamento.inicio,
          horaInicial: isValid(parseISO(agendamento.inicio)) ? format(parseISO(agendamento.inicio), "HH:mm") : agendamento.inicio,
          horaFinal: isValid(parseISO(agendamento.fim)) ? format(parseISO(agendamento.fim), "HH:mm") : agendamento.fim,
          nome: procedimento.descricaoProcedimento || "",
          qtdAutorizada: '1',
          qtdRealizada: '1',
          qtdSolicitada: '1',
          reducaoAcrescimoPct: '0',
          tecnica: '',
          valorTotal: agendamento.valor,
          valorUnitario: agendamento.procedimentoHonorario + agendamento.procedimentoFilme,
          viaAcesso: '',
        }],
        cid10: "",
        indicacao: ""
      }
    }))

    return pdf
  }
}