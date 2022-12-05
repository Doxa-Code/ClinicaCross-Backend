import { AgendamentoDocument } from "./../schemas/AgendamentoSchema";
import { FilterQuery } from "mongoose";
import AgendamentoModel from "../schemas/AgendamentoSchema";
import { Agendamento, Pagamento, Recibo } from "../entities/Agendamento";
import NodeCache from "node-cache";
import { format } from "date-fns";

export interface IAgendamentosRepository {
  save(data: Agendamento): Promise<Agendamento>;
  show(query: FilterQuery<AgendamentoDocument>): Promise<Agendamento | null>;
  getAll(
    linked?: string | boolean,
    day?: string,
    end?: string
  ): Promise<Agendamento[]>;
  getAllFilter(query: FilterQuery<AgendamentoDocument>): Promise<Agendamento[]>;
  getOne(id: string): Promise<Agendamento | null>;
  filter(
    query: FilterQuery<AgendamentoDocument>
  ): Promise<Agendamento[] | null>;
  deleteByPaciente(pacienteId: string): Promise<Boolean>;
  update(id: string, data: Agendamento): Promise<Boolean>;
  delete(id: string): Promise<Boolean>;
  getHistory(pacienteId: string): Promise<Agendamento[]>;
  addPagamento(data: Pagamento, agendamentoId: string): Promise<Boolean>;
  updatePagamento(
    data: Pagamento,
    agendamentoId: string,
    id: string
  ): Promise<Boolean>;
  removePagamento(id: string, agendamentoId: string): Promise<Boolean>;
  addRecibo(data: Recibo, agendamentoId: string): Promise<Boolean>;
  removeRecibo(id: string, agendamentoId: string): Promise<Boolean>;
}

const CACHE_LIMIT = 0.2;
const agendamentosCache = new NodeCache({
  stdTTL: CACHE_LIMIT,
  checkperiod: 0.1,
});

export class AgendamentosRepository implements IAgendamentosRepository {
  async save(data: Agendamento) {
    const count = await AgendamentoModel.countDocuments();
    let codigo = count + 1;
    let agendamentos = [];
    do {
      agendamentos = await AgendamentoModel.find({ codigo: codigo.toString() });
      codigo++;
    } while (agendamentos.length > 0);

    const response = await AgendamentoModel.create({
      ...data,
      codigo: data.codigo || codigo.toString(),
    });
    return response.toObject();
  }

  async getAll(linked: string | boolean = false, day: string, end?: string) {
    let query: { medico?: string; inicio?: any } = {};

    if (linked) {
      query.medico = linked.toString();
    }

    if (end) {
      query.inicio = {
        $gte: day || format(new Date(), "yyyy-MM-dd"),
        $lte: end || format(new Date(), "yyyy-MM-dd"),
      };
    } else {
      query.inicio = new RegExp(day || format(new Date(), "yyyy-MM-dd"), "gim");
    }
    const agendamentos = await AgendamentoModel.find(query);
    return agendamentos.map((agendamento) => {
      return agendamento.toObject();
    });
  }

  async getAllFilter(query: FilterQuery<AgendamentoDocument>) {
    const agendamentos = await AgendamentoModel.find(query);

    return agendamentos.map((agendamento) => {
      return agendamento.toObject();
    });
  }

  async show(query: FilterQuery<AgendamentoDocument>) {
    const agendamento = await AgendamentoModel.findOne(query);
    if (!agendamento) return null;

    return agendamento?.toObject();
  }

  async filter(query: FilterQuery<AgendamentoDocument>) {
    const agendamentos = await AgendamentoModel.find(query);

    return agendamentos.map((agendamento) => {
      return agendamento.toObject();
    });
  }

  async deleteByPaciente(pacienteId: string) {
    const { deletedCount } = await AgendamentoModel.deleteMany({
      paciente: pacienteId,
    });
    if (!deletedCount) return false;
    return deletedCount > 0;
  }

  async getOne(id: string) {
    const agendamento = await AgendamentoModel.findById(id)
      .select("+pagamento")
      .select("+recibo");
    if (!agendamento) return null;
    return agendamento?.toObject();
  }

  async update(id: string, data: Agendamento) {
    const response = await AgendamentoModel.updateOne(
      { _id: id },
      { $set: data }
    );
    return response.nModified > 0;
  }

  async delete(id: string) {
    const { deletedCount } = await AgendamentoModel.deleteOne({ _id: id });
    if (!deletedCount) return false;
    return deletedCount > 0;
  }

  async getHistory(pacienteId: string) {
    const response = await AgendamentoModel.find({ paciente: pacienteId });
    if (!response) {
      throw new Error("Não foi possivel encontrar os registros do histórico");
    }

    return response.map((agendamento) => agendamento.toObject());
  }

  async addPagamento(data: Pagamento, agendamentoId: string) {
    const add = await AgendamentoModel.updateOne(
      { _id: agendamentoId },
      { $push: { pagamento: data } }
    );
    if (add.nModified <= 0) {
      throw new Error("Não foi possível adicionar o pagamento");
    }
    return true;
  }

  async updatePagamento(data: Pagamento, agendamentoId: string, id: string) {
    const response = await AgendamentoModel.findById(agendamentoId);
    if (!response) {
      throw new Error("Não foi possível encontrar o agendamento");
    }
    const pagamento = response.toObject().pagamento.map((pagamento) => {
      if (pagamento.responsavel) {
        pagamento.responsavel = pagamento.responsavel?._id;
      }
      if (pagamento.formaPagamento) {
        pagamento.formaPagamento = pagamento.formaPagamento?._id;
      }
      if (pagamento._id.toString() === id) {
        return {
          ...pagamento,
          ...data,
        };
      }
      return pagamento;
    });

    const update = await AgendamentoModel.updateOne(
      { _id: agendamentoId },
      { $set: { pagamento } }
    );

    if (update.nModified <= 0) {
      throw new Error("Não foi possível alterar o pagamento");
    }
    return true;
  }

  async removePagamento(id: string, agendamentoId: string) {
    const response = await AgendamentoModel.findById(agendamentoId);
    if (!response) {
      throw new Error("Não foi possível encontrar o agendamento");
    }
    const agendamento = response.toObject();
    const pagamentos = agendamento.pagamento.filter(
      (pagamento) => pagamento._id.toString() !== id
    );
    const remove = await AgendamentoModel.updateOne(
      { _id: agendamentoId },
      {
        $set: {
          pagamento: pagamentos.map((pagamento) => {
            if (pagamento.responsavel) {
              pagamento.responsavel = pagamento.responsavel?._id;
            }

            if (pagamento.formaPagamento) {
              pagamento.formaPagamento = pagamento.formaPagamento?._id;
            }
            return pagamento;
          }),
        },
      }
    );

    if (remove.nModified <= 0) {
      throw new Error("Não foi possível remover o pagamento");
    }
    return true;
  }

  async addRecibo(data: Recibo, agendamentoId: string) {
    const add = await AgendamentoModel.updateOne(
      { _id: agendamentoId },
      { $push: { recibo: data } }
    );
    if (add.nModified <= 0) {
      throw new Error("Não foi possível adicionar o recibo");
    }
    return true;
  }

  async removeRecibo(id: string, agendamentoId: string) {
    const response = await AgendamentoModel.findById(agendamentoId);
    if (!response) {
      throw new Error("Não foi possível encontrar o agendamento");
    }
    const agendamento = response.toObject();
    const recibos = agendamento.recibo.filter(
      (recibo) => recibo._id.toString() !== id
    );
    const remove = await AgendamentoModel.updateOne(
      { _id: agendamentoId },
      {
        $set: {
          recibo: recibos.map((recibo) => {
            if (recibo.responsavel) {
              recibo.responsavel = recibo.responsavel?._id;
            }
            return recibo;
          }),
        },
      }
    );

    if (remove.nModified <= 0) {
      throw new Error("Não foi possível remover o pagamento");
    }
    return true;
  }
}
