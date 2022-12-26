import { Convenio } from "./../entities/Convenio";
import mongoose from "../config/mongodb";

export type ConvenioDocument = Convenio & mongoose.Document;

const ConvenioSchema = new mongoose.Schema<ConvenioDocument>(
  {
    codigo: {
      type: String,
      trim: true
    },
    numero: {
      type: Number
    },
    nome: {
      type: String,
      trim: true,
      required: true,
    },
    thumbnail: {
      type: String,
      trim: true,
    },
    geraRecibo: {
      type: Boolean,
      default: false,
    },
    carteirinha: {
      type: Boolean,
      default: true,
    },
    procedimentos: [
      {
        _id: {
          type: String,
          trim: true,
        },
        valorHonorario: {
          type: String,
          trim: true,
        },
        valorFilme: {
          type: String,
          trim: true,
        },
      },
    ],
  },
  {
    versionKey: false,
  }
);

ConvenioSchema.pre("find", function (next) {
  this.populate("procedimentos._id", ["+"], "Procedimento");
  next();
});

ConvenioSchema.pre("findOne", function (next) {
  this.populate("procedimentos._id", ["+"], "Procedimento");
  next();
});

export default mongoose.model<ConvenioDocument>("Convenio", ConvenioSchema);
