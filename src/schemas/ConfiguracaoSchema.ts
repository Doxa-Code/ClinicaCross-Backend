import { Configuracao } from "./../entities/Configuracao";
import mongoose from "../config/mongodb";

export type ConfiguracaoDocument = Configuracao & mongoose.Document;

const ConfiguracaoSchema = new mongoose.Schema<ConfiguracaoDocument>(
  {
    nomeContratado: {
      type: String,
      trim: true,
      required:true
    },
    tipoTransacao: {
      type: String,
      trim: true,
      default: 'ENVIO_LOTE_GUIAS'
    },
    codigoPrestadorNaOperadora: {
      type: String,
      trim: true
    },
    registroANS: {
      type: String,
      trim: true
    },
    versaoPadrao: {
      type: String,
      trim: true,
      default: "3.02.00"
    },
    CNES: {
      type: String,
      trim: true
    },
    cnpj: {
      type: String,
      trim: true
    },
    bloco: {
      type: Number,
      trim: true,
      default: 15
    },
    inicio: {
      type: String,
      trim: true,
      default: "08:00"
    },
    fim: {
      type: String,
      trim: true,
      default: "19:00"
    },
    tipoLogradouro: {
      type: String,
      trim: true
    },
    logradouro: {
      type: String,
      trim: true
    },
    numero: {
      type: String,
      trim: true
    },
    complemento: {
      type: String,
      trim: true
    },
    municipio: {
      type: String,
      trim: true
    },
    uf: {
      type: String,
      trim: true
    },
    codigoIbgeMunicipio: {
      type: String,
      trim: true
    },
    cep: {
      type: String,
      trim: true
    }
  },
  {
    versionKey: false
  }
)

export default mongoose.model<ConfiguracaoDocument>('Configuracao', ConfiguracaoSchema, 'configuracoes')