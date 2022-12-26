import { Medico } from "./../entities/Medico";
import mongoose from "../config/mongodb";

export type MedicoDocument = Medico & mongoose.Document;

const MedicoSchema = new mongoose.Schema<MedicoDocument>(
  {
    sigla: {
      type: String,
      trim: true,
    },
    shortSchedule: {
      type: Boolean,
      default: false,
    },
    bloco: {
      type: Number,
      trim: true,
      default: 15,
    },
    nome: {
      type: String,
      trim: true,
      required: true,
    },
    conselhoProfissional: {
      type: String,
      trim: true,
      default: "06",
    },
    numeroConselhoProfissional: {
      type: String,
      trim: true,
    },
    codigo: {
      type: String,
      trim: true
    },
    UF: {
      type: String,
      trim: true,
    },
    especialidade: {
      type: String,
      trim: true,
    },
    cor: {
      type: String,
      trim: true,
      required: true,
    },
    cbos: {
      type: String,
      trim: true,
      default: "999999",
    },
    diasDaSemana: [
      {
        type: Number,
        trim: true,
        default: [0, 1, 2, 3, 4, 5, 6],
      },
    ],
    repasse: [
      {
        convenio: {
          type: String,
          trim: true,
        },
        porcentagem: {
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

MedicoSchema.pre("find", function (next) {
  this.populate("repasse.convenio", ["+"], "Convenio");
  next();
});

MedicoSchema.pre("findOne", function (next) {
  this.populate("repasse.convenio", ["+"], "Convenio");
  next();
});

export default mongoose.model<MedicoDocument>("Medico", MedicoSchema);
