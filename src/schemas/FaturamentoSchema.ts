import { Faturamento, IGuiaSADT } from "../entities/Faturamento";
import mongoose from '../config/mongodb'

export type FaturamentoDocument = Faturamento & mongoose.Document 
export type GuiaSADTDocument = IGuiaSADT & mongoose.Document 

const GuiaSADTSchema = new mongoose.Schema<GuiaSADTDocument>(
  {
    "guiaSP-SADT": {
      cabecalhoGuia: {
        numeroGuiaPrestador: {
          type: String,
          trim: true
        },
        guiaPrincipal: {
          type: String,
          trim: true
        }
      },
      dadosAutorizacao: {
        numeroGuiaOperadora: {
          type: String,
          trim: true
        },
        dataAutorizacao: {
          type: String,
          trim: true
        },
        senha: {
          type: String,
          trim: true
        },
        dataValidadeSenha: {
          type: String,
          trim: true
        }
      },
      dadosBeneficiario: {
        type: String,
        trim: true
      },
      dadosSolicitante: {
        profissionalSolicitante: {
          type: String,
          trim: true
        }
      },
      dadosSolicitacao: {
        type: String,
        trim: true
      },
      dadosAtendimento: {
        tipoAtendimento: {
          type: String,
          trim: true
        },
        indicacaoAcidente: {
          type: String,
          trim: true
        },
        tipoConsulta: {
          type: String,
          trim: true
        },
        motivoEncerramento: {
          type: String,
          trim: true
        }
      },
      outrasDespesas: {
        despesa: [
          {
            procedimento: {
              type: String,
              trim: true
            },
            quantidadeExecutada: {
              type: String,
              trim: true
            },
            reducaoAcrescimo: {
              type: String,
              trim: true
            },
            valorUnitario: {
              type: String,
              trim: true
            },
            valorTotal: {
              type: String,
              trim: true
            }
          }
        ]
      },
      observacao: {
        type: String,
        trim: true
      },
      valorTotal: {
        valorProcedimentos: {
          type: String,
          trim: true
        },
        valorDiarias: {
          type: String,
          trim: true
        },
        valorTaxasAlugueis: {
          type: String,
          trim: true
        },
        valorMateriais: {
          type: String,
          trim: true
        },
        valorMedicamentos: {
          type: String,
          trim: true
        },
        valorOPME: {
          type: String,
          trim: true
        },
        valorGasesMedicinais: {
          type: String,
          trim: true
        },
        valorTotalGeral: {
          type: String,
          trim: true
        }
      }
    }
  },
  {
    versionKey: false
  }
)

const FaturamentoSchema = new mongoose.Schema<FaturamentoDocument>(
  {
    cabecalho: {
      identificacaoTransacao: {
        sequencialTransacao: {
          type: String,
          trim: true
        }
      }
    },
    prestadorParaOperadora: {
      loteGuias: {
        numeroLote: { 
          type: String,
          trim: true
        },
        guiasTISS: [GuiaSADTSchema]
      }
    }  
  },
  {
    versionKey: false
  }
)

FaturamentoSchema.pre("find", function(next) {
  this.populate("prestadorParaOperadora.loteGuias.guiasTISS.guiaSP-SADT.dadosBeneficiario", ["+"], "Paciente")
      .populate("prestadorParaOperadora.loteGuias.guiasTISS.guiaSP-SADT.dadosSolicitacao", ["+"], "Agendamento")
      .populate("prestadorParaOperadora.loteGuias.guiasTISS.guiaSP-SADT.dadosSolicitante.profissionalSolicitante", ["+"], "Medico")
  next()
})

FaturamentoSchema.pre("findOne", function(next) {
  this.populate("prestadorParaOperadora.loteGuias.guiasTISS.guiaSP-SADT.dadosBeneficiario", ["+"], "Paciente")
      .populate("prestadorParaOperadora.loteGuias.guiasTISS.guiaSP-SADT.dadosSolicitacao", ["+"], "Agendamento")
      .populate("prestadorParaOperadora.loteGuias.guiasTISS.guiaSP-SADT.dadosSolicitante.profissionalSolicitante", ["+"], "Medico")
  next()
})


export default mongoose.model<FaturamentoDocument>('Faturamento', FaturamentoSchema)
