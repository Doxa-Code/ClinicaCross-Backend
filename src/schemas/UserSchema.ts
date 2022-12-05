import { User, Transacao } from "./../entities/User";
import mongoose from "../config/mongodb";
import bcrypt from "bcrypt";

export type UserDocument = User & mongoose.Document;
export type TransacaoDocument = Transacao & mongoose.Document;

const TransacaoSchema = new mongoose.Schema<TransacaoDocument>(
  {
    destinatario: {
      type: String,
      required: true,
    },
    remetente: {
      type: String,
      required: true,
    },
    mensagem: {
      type: String,
      default: "Transação realizada com sucesso",
    },
    valor: {
      type: Number,
      default: 0,
    },
    tipo: {
      type: String,
      enum: ["Receita", "Despesa"],
    },
    data: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserSchema = new mongoose.Schema<UserDocument>(
  {
    nome: {
      type: String,
      trim: true,
      required: true,
    },
    user: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    linked: {
      type: String,
      trim: true,
      default: undefined,
    },
    grupo: {
      type: String,
      trim: true,
    },
    ativo: {
      type: Boolean,
      default: true,
    },
    valor: {
      type: Number,
      default: 0,
    },
    transacoes: [
      {
        type: TransacaoSchema,
        default: [],
        select: false,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.pre("save", async function (next) {
  this.linked = this.linked || undefined;
  this.grupo = this.grupo || undefined;
  const hash = await bcrypt.hash(this.password || "", 10);
  this.password = hash;
  next();
});

UserSchema.pre("updateOne", async function (next) {
  const doc: any = this;

  doc._update.$set["linked"] =
    doc._update.$set["linked"] === "" ? undefined : doc._update.$set["linked"];

  if (!doc._update.$set["password"]) return next();

  const hash = await bcrypt.hash(doc._update.$set["password"], 10);
  doc._update.$set["password"] = hash;

  next();
});

UserSchema.pre("find", function (next) {
  this.populate({
    path: "grupo",
    select: ["+"],
    model: "Grupo",
  }).populate({
    path: "linked",
    select: ["nome"],
    model: "Medico",
  });
  next();
});

UserSchema.pre("findOne", function (next) {
  this.populate("transacoes.destinatario", ["nome"], "User")
    .populate("transacoes.remetente", ["nome"], "User")
    .populate({
      path: "grupo",
      select: ["+"],
      model: "Grupo",
    })
    .populate({
      path: "linked",
      select: ["nome"],
      model: "Medico",
    });
  next();
});

export default mongoose.model<UserDocument>("User", UserSchema);
