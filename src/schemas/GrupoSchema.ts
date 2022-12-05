import { Grupo } from "../entities/Grupo";
import mongoose from "../config/mongodb";

export type GrupoDocument = Grupo & mongoose.Document;

const GrupoSchema = new mongoose.Schema<GrupoDocument>(
  {
    nome: {
      type: String,
      required: true,
      trim: true,
    },
    adm: {
      type: Boolean,
      default: false,
    },
    bloqueiaHorario: {
      type: Boolean,
      default: false,
    },
    acessos: {
      type: [String],
      default: [],
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<GrupoDocument>("Grupo", GrupoSchema);
