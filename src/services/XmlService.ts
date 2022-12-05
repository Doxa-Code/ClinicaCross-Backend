import { differenceInDays, format, parseISO } from "date-fns";
import { modifyKeysANS, getHash } from "./../utils/index";
import { Configuracao } from "./../entities/Configuracao";
import { Faturamento } from "./../entities/Faturamento";
import { j2xParser } from 'fast-xml-parser'

interface DTO {
  faturamento: Faturamento,
  configuracao: Configuracao
}

export interface IXmlService {
  create(data: DTO): Promise<Buffer>
}

export class XmlService implements IXmlService {
  async create({ faturamento, configuracao }: DTO) {
    const parser = new j2xParser({
      ignoreAttributes: false,
      format: true,
    })
    const body = {
      cabecalho: {
        identificacaoTransacao: {
          tipoTransacao: configuracao.tipoTransacao,
          ...faturamento.cabecalho.identificacaoTransacao,
          dataRegistroTransacao: format(new Date(), 'yyyy-MM-dd'),
          horaRegistroTransacao: format(new Date(), 'HH:mm:ss'),
        },
        origem:{
          identificacaoPrestador: {
            codigoPrestadorNaOperadora: configuracao.codigoPrestadorNaOperadora,
          },
        },
        destino: {
          registroANS: configuracao.registroANS,
        },
        versaoPadrao: configuracao.versaoPadrao,
      },
      prestadorParaOperadora: {
        loteGuias: {
          numeroLote: faturamento.prestadorParaOperadora.loteGuias.numeroLote,
          guiasTISS: faturamento.prestadorParaOperadora.loteGuias.guiasTISS.map(guia => ({
            "guiaSP-SADT": {
              cabecalhoGuia: {
                registroANS: configuracao.registroANS,
                ...guia["guiaSP-SADT"]?.cabecalhoGuia
              },
              dadosAutorizacao: guia["guiaSP-SADT"]?.dadosAutorizacao,
              dadosBeneficiario: {
                numeroCarteira: guia["guiaSP-SADT"]?.dadosSolicitacao.numeroCarteira,
                atendimentoRN: differenceInDays(new Date(), parseISO(guia["guiaSP-SADT"]?.dadosBeneficiario.dataNascimento)) <= 28 ? "S" : "N",
                nomeBeneficiario: guia["guiaSP-SADT"]?.dadosBeneficiario.nome,
                numeroCNS: guia["guiaSP-SADT"]?.dadosBeneficiario.cns,
                identificadorBeneficiario: guia["guiaSP-SADT"]?.dadosBeneficiario.identificador,
              },
              dadosSolicitante: {
                contratadoSolicitante: {
                  codigoPrestadorNaOperadora: configuracao.codigoPrestadorNaOperadora,
                  nomeContratado: configuracao.nomeContratado,
                },
                profissionalSolicitante: {
                  nomeProfissional: guia["guiaSP-SADT"]?.dadosSolicitante.profissionalSolicitante.nome,
                  conselhoProfissional: guia["guiaSP-SADT"]?.dadosSolicitante.profissionalSolicitante.conselhoProfissional,
                  numeroConselhoProfissional: guia["guiaSP-SADT"]?.dadosSolicitante.profissionalSolicitante.numeroConselhoProfissional,
                  UF: guia["guiaSP-SADT"]?.dadosSolicitante.profissionalSolicitante.UF,
                  CBOS: guia["guiaSP-SADT"]?.dadosSolicitante.profissionalSolicitante.cbos,
                }
              },
              dadosSolicitacao: {
                dataSolicitacao: format(parseISO(guia["guiaSP-SADT"].dadosSolicitacao.inicio), 'yyyy-MM-dd'),
                caraterAtendimento: guia["guiaSP-SADT"].dadosSolicitacao.caraterAtendimento,
                indicacaoClinica: guia["guiaSP-SADT"].dadosSolicitacao.indicacaoClinica,
              },
              dadosExecutante: {
                contratadoExecutante: {
                  cnpjContratado: configuracao.cnpj,
                  nomeContratado: configuracao.nomeContratado,
                },
                CNES: configuracao.CNES,
              },
              dadosAtendimento: guia["guiaSP-SADT"].dadosAtendimento,
              procedimentosExecutados: {
                procedimentoExecutado: {
                  dataExecucao: format(parseISO(guia["guiaSP-SADT"].dadosSolicitacao.inicio), 'yyyy-MM-dd'),
                  horaInicial: format(parseISO(guia["guiaSP-SADT"].dadosSolicitacao.inicio), 'HH:mm:ss'),
                  horaFinal: format(parseISO(guia["guiaSP-SADT"].dadosSolicitacao.fim), 'HH:mm:ss'),
                  procedimento: {
                    codigoTabela: guia["guiaSP-SADT"].dadosSolicitacao.procedimento?.codigoTabela,
                    codigoProcedimento: guia["guiaSP-SADT"].dadosSolicitacao.procedimento?.codigoProcedimento,
                    descricaoProcedimento: guia["guiaSP-SADT"].dadosSolicitacao.procedimento?.descricaoProcedimento,
                  },
                  quantidadeExecutada: 1,
                  viaAcesso: '',
                  tecnicaUtilizada: '',
                  reducaoAcrescimo: '',
                  valorUnitario: guia["guiaSP-SADT"].dadosSolicitacao.valor,
                  valorTotal: guia["guiaSP-SADT"].dadosSolicitacao.valor,
                },
              },
              outrasDespesas: {
                despesa: guia["guiaSP-SADT"].outrasDespesas.despesa.map(despesa => ({
                  codigoDespesa: despesa.procedimento.codigoDespesa,
                  servicosExecutados: {
                    dataExecucao: format(parseISO(guia["guiaSP-SADT"].dadosSolicitacao.inicio), 'yyyy-MM-dd'),
                    horaInicial: format(parseISO(guia["guiaSP-SADT"].dadosSolicitacao.inicio), 'HH:mm:ss'),
                    horaFinal: format(parseISO(guia["guiaSP-SADT"].dadosSolicitacao.fim), 'HH:mm:ss'),
                    codigoTabela: despesa.procedimento.codigoTabela,
                    codigoProcedimento: despesa.procedimento.codigoProcedimento,
                    quantidadeExecutada: 1,
                    unidadeMedida: despesa.procedimento.unidadeMedida,
                    reducaoAcrescimo: despesa.reducaoAcrescimo,
                    valorUnitario: despesa.valorUnitario,
                    valorTotal: despesa.valorTotal,
                    descricaoProcedimento: despesa.procedimento.descricaoProcedimento,
                    registroANVISA: "",
                    codigoRefFabricante: "",
                    autorizacaoFuncionamento: ""
                  }
                }))
              },
              observacao: guia["guiaSP-SADT"].observacao,
              valorTotal: guia["guiaSP-SADT"].valorTotal,
            }
          })),
        },
      }
    }
    const xml = parser.parse({
      "ans:mensagemTISS": {
        "@_xmlns:ans": `http://www.ans.gov.br/padroes/tiss/schemas`,
        "@_xsi:schemaLocation": `http://www.ans.gov.br/padroes/tiss/schemas http://www.ans.gov.br/padroes/tiss/schemas/tissV3_02_00.xsd`,
        "@_xmlns:xsi": `http://www.w3.org/2001/XMLSchema-instance`,
        "@_xmlns:ns2": `http://www.w3.org/2000/09/xmldsig#`,
        "@_xmlns": `http://www.ans.gov.br/padroes/tiss/schemas`,
        ...modifyKeysANS(body),
        "ans:epilogo": {
          "ans:hash": getHash(body)
        }
      }
    })

    return Buffer.from(xml, "utf-8")
  }
}