import { Modelo } from "../entities/Modelo";
import mongoose from "../config/mongodb";

export type ModeloDocument = Modelo & mongoose.Document;

const ModeloSchema = new mongoose.Schema<ModeloDocument>(
  {
    nome: {
      type: String,
      required: true,
      trim: true,
    },
    corpo: {
      type: String,
      required: true,
      trim: true,
    },
    tipo: {
      type: String,
      required: true,
      enum: ["Receita", "Atestado", "Declaracao", "Prontuario"],
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<ModeloDocument>("Modelo", ModeloSchema);
