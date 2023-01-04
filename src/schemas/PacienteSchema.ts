import {
  Paciente,
  Laudo,
  Receita,
  Atestado,
  Prontuario,
  Anexo,
  Pedido,
  Exame,
  Declaracao,
} from "./../entities/Paciente";
import mongoose from "../config/mongodb";

export type PacienteDocument = Paciente & mongoose.Document;
export type LaudoDocument = Laudo & mongoose.Document;
export type PedidoDocument = Pedido & mongoose.Document;
export type ReceitaDocument = Receita & mongoose.Document;
export type ExameDocument = Exame & mongoose.Document;
export type AtestadoDocument = Atestado & mongoose.Document;
export type DeclaracaoDocument = Declaracao & mongoose.Document;
export type ProntuarioDocument = Prontuario & mongoose.Document;
export type AnexoDocument = Anexo & mongoose.Document;

const DeclaracaoSchema = new mongoose.Schema<DeclaracaoDocument>(
  {
    titulo: {
      type: String,
      trim: true,
    },
    responsavel: {
      type: String,
      trim: true,
    },
    data: String,
  },
  {
    timestamps: true,
  }
);

const AnexoSchema = new mongoose.Schema<AnexoDocument>(
  {
    responsavel: {
      type: String,
      trim: true,
    },
    nome: {
      type: String,
      trim: true,
    },
    data: String,
  },
  {
    timestamps: true,
  }
);

const ProntuarioSchema = new mongoose.Schema<ProntuarioDocument>(
  {
    responsavel: {
      type: String,
      trim: true,
    },
    data: String,
  },
  {
    timestamps: true,
  }
);

const AtestadoSchema = new mongoose.Schema<AtestadoDocument>(
  {
    titulo: {
      type: String,
      trim: true,
    },
    responsavel: {
      type: String,
      trim: true,
    },
    data: String,
  },
  {
    timestamps: true,
  }
);

const ReceitaSchema = new mongoose.Schema<ReceitaDocument>(
  {
    titulo: {
      type: String,
      trim: true,
    },
    responsavel: {
      type: String,
      trim: true,
    },
    data: String,
  },
  {
    timestamps: true,
  }
);

const ExameSchema = new mongoose.Schema<ExameDocument>(
  {
    titulo: {
      type: String,
      trim: true,
    },
    responsavel: {
      type: String,
      trim: true,
    },
    data: String,
  },
  {
    timestamps: true,
  }
);

const LaudoSchema = new mongoose.Schema<LaudoDocument>(
  {
    titulo: {
      type: String,
      trim: true,
    },
    responsavel: {
      type: String,
      trim: true,
    },
    data: String,
  },
  {
    timestamps: true,
  }
);

const PedidoSchema = new mongoose.Schema<PedidoDocument>(
  {
    titulo: {
      type: String,
      trim: true,
    },
    responsavel: {
      type: String,
      trim: true,
    },
    data: String,
  },
  {
    timestamps: true,
  }
);

const PacienteSchema = new mongoose.Schema<PacienteDocument>(
  {
    thumbnail: {
      type: String,
      trim: true,
    },
    codigo: {
      type: String,
      trim: true
    },
    nome: {
      type: String,
      trim: true,
      require: true,
    },
    cpf: {
      type: String,
      trim: true
    },
    rg: {
      type: String,
      trim: true
    },
    dataNascimento: {
      type: String,
      require: true,
      trim: true,
    },
    cns: {
      type: String,
      trim: true,
    },
    identificador: {
      type: String,
      trim: true,
    },
    whatsapp: {
      type: String,
      trim: true,
    },
    telefone: {
      type: String,
      trim: true,
    },
    cep: {
      type: String,
      trim: true,
    },
    rua: {
      type: String,
      trim: true,
    },
    numero: {
      type: String,
      trim: true,
    },
    bairro: {
      type: String,
      trim: true,
    },
    complemento: {
      type: String,
      trim: true,
    },
    cidade: {
      type: String,
      trim: true,
    },
    uf: {
      type: String,
      trim: true,
    },
    laudo: [
      {
        type: LaudoSchema,
        select: false,
      },
    ],
    pedido: [
      {
        type: PedidoSchema,
        select: false,
      },
    ],
    receita: [
      {
        type: ReceitaSchema,
        select: false,
      },
    ],
    exame: [
      {
        type: ExameSchema,
        select: false,
      },
    ],
    atestado: [
      {
        type: AtestadoSchema,
        select: false,
      },
    ],
    declaracao: [
      {
        type: DeclaracaoSchema,
        select: false,
      },
    ],
    prontuario: [
      {
        type: ProntuarioSchema,
        select: false,
      },
    ],
    anexo: [
      {
        type: AnexoSchema,
        select: false,
      },
    ],
    responsavel: {
      type: String,
    },
    email: {
      type: String,
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// PacienteSchema.plugin(mongoosePaginate)

PacienteSchema.pre("find", function (next) {
  this.populate("prontuario.responsavel", ["nome"], "User")
    .populate("receita.responsavel", ["nome"], "User")
    .populate("anexo.responsavel", ["nome"], "User")
    .populate("atestado.responsavel", ["nome"], "User")
    .populate("declaracao.responsavel", ["nome"], "User")
    .populate("laudo.responsavel", ["nome"], "User")
    .populate("pedido.responsavel", ["nome"], "User");
  next();
});

PacienteSchema.pre("findOne", function (next) {
  this.populate("prontuario.responsavel", ["nome"], "User")
    .populate("receita.responsavel", ["nome"], "User")
    .populate("anexo.responsavel", ["nome"], "User")
    .populate("declaracao.responsavel", ["nome"], "User")
    .populate("atestado.responsavel", ["nome"], "User")
    .populate("laudo.responsavel", ["nome"], "User")
    .populate("pedido.responsavel", ["nome"], "User");
  next();
});

export default mongoose.model<PacienteDocument>("Paciente", PacienteSchema);
