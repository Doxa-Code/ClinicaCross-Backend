import PacienteModel, { PacienteDocument } from "../schemas/PacienteSchema";
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
} from "../entities/Paciente";
import { FilterQuery } from "mongoose";

export interface IPacienteRepository {
  index(limit: number, page: number): Promise<Paciente[] | []>;
  search(
    query: FilterQuery<PacienteDocument>,
    limit: number,
    page: number
  ): Promise<Paciente[] | []>;
  show(query: FilterQuery<PacienteDocument>): Promise<Paciente | null>;
  save(data: Paciente): Promise<Paciente>;
  update(data: Paciente, query: FilterQuery<PacienteDocument>): Promise<void>;
  delete(query: FilterQuery<PacienteDocument>): Promise<void>;
  addLaudo(data: Laudo, pacienteId: string): Promise<Boolean>;
  removeLaudo(id: string, pacienteId: string): Promise<Boolean>;
  addPedido(data: Laudo, pacienteId: string): Promise<Boolean>;
  removePedido(id: string, pacienteId: string): Promise<Boolean>;
  addReceita(data: Receita, pacienteId: string): Promise<Boolean>;
  addExame(data: Receita, pacienteId: string): Promise<Boolean>;
  removeReceita(id: string, pacienteId: string): Promise<Boolean>;
  addDeclaracao(data: Declaracao, pacienteId: string): Promise<Boolean>;
  removeExame(id: string, pacienteId: string): Promise<Boolean>;
  addAtestado(data: Atestado, pacienteId: string): Promise<Boolean>;
  addProntuario(data: Prontuario, pacienteId: string): Promise<Boolean>;
  addAnexo(data: Anexo, pacienteId: string): Promise<Boolean>;
  removeAnexo(id: string, pacienteId: string): Promise<Boolean>;
  countDocuments(query?: FilterQuery<PacienteDocument>): Promise<number>;
}

export class PacienteRepository implements IPacienteRepository {
  async save(data: Paciente) {
    const lastPacienteByCodigo = await PacienteModel.find({ codigo: /\d+/ })
      .sort({ codigo: -1 })
      .limit(1);

    let codigo = Number(lastPacienteByCodigo[0].codigo) + 1;

    if (isNaN(codigo)) {
      let pacientes = [];
      codigo = await PacienteModel.countDocuments();
      do {
        pacientes = await PacienteModel.find({ codigo: codigo.toString() });
        codigo++;
      } while (pacientes.length > 0);
    }

    const response = await PacienteModel.create({
      ...data,
      codigo,
    });

    return response.toObject();
  }

  async update(data: Paciente, query: FilterQuery<PacienteDocument>) {
    await PacienteModel.updateOne(query, { $set: data });
  }

  async index(limit: number = 10, page: number = 1) {
    const pacientes = await PacienteModel.find()
      .sort({ nome: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    if (!pacientes) return [];
    return pacientes.map((paciente) => paciente.toObject());
  }

  async search(
    query: FilterQuery<PacienteDocument>,
    limit: number = 10,
    page: number = 1
  ) {
    const pacientes = await PacienteModel.find(query)
      .select([
        "-laudo",
        "-pedido",
        "-receita",
        "-exame",
        "-atestado",
        "-declaracao",
        "-prontuario",
        "-anexo",
        "-codigo",
        "-cep",
        "-rua",
        "-cidade",
        "-uf",
        "-createdAt",
        "-updatedAt",
      ])
      .sort({ nome: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    if (!pacientes) return [];
    return pacientes.map((paciente) => paciente.toObject());
  }

  async countDocuments(query?: FilterQuery<PacienteDocument>): Promise<number> {
    const count = await PacienteModel.countDocuments(query || {});
    return count;
  }

  async show(query: FilterQuery<PacienteDocument>) {
    const paciente = await PacienteModel.findOne(query)
      .select("+laudo")
      .select("+atestado")
      .select("+receita")
      .select("+prontuario")
      .select("+anexo")
      .select("+pedidos");
    if (!paciente) {
      return null;
    }
    return paciente?.toObject();
  }

  async delete(query: FilterQuery<PacienteDocument>) {
    await PacienteModel.deleteOne(query);
  }

  async addDeclaracao(data: Declaracao, pacienteId: string) {
    const add = await PacienteModel.updateOne(
      { _id: pacienteId },
      { $push: { declaracao: data } }
    );
    if (add.nModified <= 0) {
      throw new Error("Não foi possível adicionar a declaração");
    }
    return true;
  }

  async addLaudo(data: Laudo, pacienteId: string) {
    const add = await PacienteModel.updateOne(
      { _id: pacienteId },
      { $push: { laudo: data } }
    );
    if (add.nModified <= 0) {
      throw new Error("Não foi possível adicionar o laudo");
    }
    return true;
  }

  async addPedido(data: Pedido, pacienteId: string) {
    const add = await PacienteModel.updateOne(
      { _id: pacienteId },
      { $push: { pedido: data } }
    );
    if (add.nModified <= 0) {
      throw new Error("Não foi possível adicionar o pedido");
    }
    return true;
  }

  async removeLaudo(id: string, pacienteId: string) {
    const response = await PacienteModel.findById(pacienteId);
    if (!response) {
      throw new Error("Não foi possível encontrar o paciente");
    }
    const paciente = response.toObject();
    const laudos = paciente.laudo.filter(
      (laudo) => laudo._id.toString() !== id
    );
    const remove = await PacienteModel.updateOne(
      { _id: pacienteId },
      {
        $set: {
          laudo: laudos.map((laudo) => {
            if (laudo.responsavel) {
              laudo.responsavel = laudo.responsavel?._id;
            }
            return laudo;
          }),
        },
      }
    );

    if (remove.nModified <= 0) {
      throw new Error("Não foi possível remover o laudo");
    }
    return true;
  }

  async removePedido(id: string, pacienteId: string) {
    const response = await PacienteModel.findById(pacienteId);
    if (!response) {
      throw new Error("Não foi possível encontrar o paciente");
    }
    const paciente = response.toObject();
    const pedidos = paciente.pedido.filter(
      (pedidos) => pedidos._id.toString() !== id
    );
    const remove = await PacienteModel.updateOne(
      { _id: pacienteId },
      {
        $set: {
          pedido: pedidos.map((pedidos) => {
            if (pedidos.responsavel) {
              pedidos.responsavel = pedidos.responsavel?._id;
            }
            return pedidos;
          }),
        },
      }
    );

    if (remove.nModified <= 0) {
      throw new Error("Não foi possível remover o pedido");
    }
    return true;
  }

  async addReceita(data: Receita, pacienteId: string) {
    const add = await PacienteModel.updateOne(
      { _id: pacienteId },
      { $push: { receita: data } }
    );
    if (add.nModified <= 0) {
      throw new Error("Não foi possível adicionar a receita");
    }
    return true;
  }

  async addExame(data: Exame, pacienteId: string) {
    const add = await PacienteModel.updateOne(
      { _id: pacienteId },
      { $push: { exame: data } }
    );
    if (add.nModified <= 0) {
      throw new Error("Não foi possível adicionar o exame");
    }
    return true;
  }

  async removeExame(id: string, pacienteId: string) {
    const response = await PacienteModel.findById(pacienteId);
    if (!response) {
      throw new Error("Não foi possível encontrar o paciente");
    }
    const paciente = response.toObject();
    const exames = paciente.exame.filter(
      (exame) => exame._id.toString() !== id
    );
    const remove = await PacienteModel.updateOne(
      { _id: pacienteId },
      {
        $set: {
          exame: exames.map((exame) => {
            if (exame.responsavel) {
              exame.responsavel = exame.responsavel?._id;
            }
            return exame;
          }),
        },
      }
    );

    if (remove.nModified <= 0) {
      throw new Error("Não foi possível remover o exame");
    }
    return true;
  }

  async removeReceita(id: string, pacienteId: string) {
    const response = await PacienteModel.findById(pacienteId);
    if (!response) {
      throw new Error("Não foi possível encontrar o paciente");
    }
    const paciente = response.toObject();
    const receitas = paciente.receita.filter(
      (receita) => receita._id.toString() !== id
    );
    const remove = await PacienteModel.updateOne(
      { _id: pacienteId },
      {
        $set: {
          receita: receitas.map((receita) => {
            if (receita.responsavel) {
              receita.responsavel = receita.responsavel?._id;
            }
            return receita;
          }),
        },
      }
    );

    if (remove.nModified <= 0) {
      throw new Error("Não foi possível remover a receita");
    }
    return true;
  }

  async addAtestado(data: Atestado, pacienteId: string) {
    const add = await PacienteModel.updateOne(
      { _id: pacienteId },
      { $push: { atestado: data } }
    );
    if (add.nModified <= 0) {
      throw new Error("Não foi possível adicionar o atestado");
    }
    return true;
  }

  async addProntuario(data: Prontuario, pacienteId: string): Promise<Boolean> {
    const add = await PacienteModel.updateOne(
      { _id: pacienteId },
      { $push: { prontuario: data } }
    );
    if (add.nModified <= 0) {
      throw new Error("Não foi possível adicionar o prontuario");
    }
    return true;
  }

  async addAnexo(data: Anexo, pacienteId: string) {
    const add = await PacienteModel.updateOne(
      { _id: pacienteId },
      { $push: { anexo: data } }
    );
    if (add.nModified <= 0) {
      throw new Error("Não foi possível adicionar o anexo");
    }
    return true;
  }

  async removeAnexo(id: string, pacienteId: string) {
    const response = await PacienteModel.findById(pacienteId);
    if (!response) {
      throw new Error("Não foi possível encontrar o paciente");
    }
    const paciente = response.toObject();
    const anexos = paciente.anexo.filter(
      (anexo) => anexo._id.toString() !== id
    );
    const remove = await PacienteModel.updateOne(
      { _id: pacienteId },
      {
        $set: {
          anexo: anexos.map((anexo) => {
            if (anexo.responsavel) {
              anexo.responsavel = anexo.responsavel?._id;
            }
            return anexo;
          }),
        },
      }
    );

    if (remove.nModified <= 0) {
      throw new Error("Não foi possível remover o anexo");
    }
    return true;
  }
}
