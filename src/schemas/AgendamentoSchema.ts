import { Agendamento, Pagamento, Recibo } from "../entities/Agendamento";
import mongoose from "../config/mongodb";

export type AgendamentoDocument = Agendamento & mongoose.Document;
export type PagamentoDocument = Pagamento & mongoose.Document;
export type ReciboDocument = Recibo & mongoose.Document;

const ReciboSchema = new mongoose.Schema<ReciboDocument>(
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

const PagamentoSchema = new mongoose.Schema<PagamentoDocument>({
  formaPagamento: {
    type: String,
    required: true,
  },
  numeroParcela: {
    type: Number,
    required: true,
  },
  qtdParcelas: {
    type: Number,
    required: true,
  },
  valor: {
    type: String,
    default: "0",
  },
  dataVencimento: {
    type: String,
    required: true,
  },
  responsavel: {
    type: String,
    trim: true,
    ref: "User",
  },
  status: {
    type: String,
    default: "Em aberto",
  },
});

const AgendamentoSchema = new mongoose.Schema<AgendamentoDocument>(
  {
    codigo: {
      type: String,
      trim: true,
    },
    indicacaoClinica: {
      type: String,
      trim: true,
    },
    paciente: {
      type: String,
      trim: true,
    },
    convenio: {
      type: String,
      trim: true,
    },
    bloqueio: {
      type: Boolean,
      default: false,
    },
    faturado: {
      type: Boolean,
      default: false,
    },
    encaixe: {
      type: Boolean,
      default: false,
    },
    procedimento: {
      type: String,
      trim: true,
    },
    medico: {
      type: String,
      required: true,
      trim: true,
    },
    valor: {
      type: String,
      trim: true,
    },
    quantidade: {
      type: String,
      trim: true,
      default: 1
    },
    procedimentoHonorario: {
      type: String,
      trim: true,
    },
    procedimentoFilme: {
      type: String,
      trim: true,
    },
    repasse: {
      type: String,
      trim: true,
    },
    numeroCarteira: {
      type: String,
      trim: true,
    },
    validadeCarteira: {
      type: String,
      trim: true,
    },
    observacao: {
      type: String,
      trim: true,
    },
    inicio: {
      type: String,
      required: true,
      trim: true,
    },
    fim: {
      type: String,
      required: true,
      trim: true,
    },
    responsavel: {
      type: String,
      required: true,
      trim: true,
    },
    pagamento: [
      {
        type: PagamentoSchema,
        select: false,
      },
    ],
    recibo: [
      {
        type: ReciboSchema,
        select: false,
      },
    ],
    caraterAtendimento: {
      type: Number,
      default: 1,
    },
    status: {
      type: String,
      default: "Agendado",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

AgendamentoSchema.pre("find", function (next) {
  this.populate("pagamento.formaPagamento", ["nome"], "FormaDePagamento")
    .populate({
      path: "pagamento.responsavel",
      select: ["nome"],
      model: "User",
    })
    .populate({
      path: "recibo.responsavel",
      select: ["nome"],
      model: "User",
    })
    .populate({
      path: "receita.responsavel",
      select: ["nome"],
      model: "User",
    })
    .populate({
      path: "atestado.responsavel",
      select: ["nome"],
      model: "User",
    })
    .populate({
      path: "laudo.responsavel",
      select: ["nome"],
      model: "User",
    })
    .populate({
      path: "pedidos.responsavel",
      select: ["nome"],
      model: "User",
    })
    .populate("paciente", ["+"], "Paciente")
    .populate("convenio", ["nome", "geraRecibo", "thumbnail"], "Convenio")
    .populate("procedimento", ["+"], "Procedimento")
    .populate({
      path: "medico",
      select: ["+"],
      model: "Medico",
    });
  next();
});

AgendamentoSchema.pre("findOne", function (next) {
  this.populate("pagamento.formaPagamento", ["nome"], "FormaDePagamento")
    .populate({
      path: "pagamento.responsavel",
      select: ["nome"],
      model: "User",
    })
    .populate({
      path: "recibo.responsavel",
      select: ["nome"],
      model: "User",
    })
    .populate({
      path: "receita.responsavel",
      select: ["nome"],
      model: "User",
    })
    .populate({
      path: "atestado.responsavel",
      select: ["nome"],
      model: "User",
    })
    .populate({
      path: "laudo.responsavel",
      select: ["nome"],
      model: "User",
    })
    .populate({
      path: "pedidos.responsavel",
      select: ["nome"],
      model: "User",
    })
    .populate("paciente", ["+"], "Paciente")
    .populate("convenio", ["nome", "geraRecibo", "thumbnail"], "Convenio")
    .populate("procedimento", ["+"], "Procedimento")
    .populate({
      path: "medico",
      select: ["+"],
      model: "Medico",
    });
  next();
});

export default mongoose.model<AgendamentoDocument>(
  "Agendamento",
  AgendamentoSchema
);
