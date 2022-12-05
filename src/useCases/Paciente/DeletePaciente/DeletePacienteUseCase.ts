import { IAgendamentosRepository } from "./../../../repositories/AgendamentosRepository";
import { S3 } from "aws-sdk";
import { Anexo } from "./../../../entities/Paciente";
import { DeletePacienteDTO } from "./DeletePacienteDTO";
import { IPacienteRepository } from "../../../repositories/PacienteRepository";

export interface IDeletePacienteUseCase {
  execute(query: DeletePacienteDTO): Promise<void>
}

export class DeletePacienteUseCase implements IDeletePacienteUseCase {
  constructor(private PacienteRepository: IPacienteRepository, private storage: S3, private agendamentoRepository: IAgendamentosRepository){}

  async execute(query: DeletePacienteDTO) {
    const agendamentos = await this.agendamentoRepository.filter({ paciente: query._id });
    if(agendamentos && agendamentos.length > 0) {
      throw new Error("Paciente possui agendamentos, não pode ser deletado");
    }
    const paciente = await this.PacienteRepository.show({ _id: query._id })
    if(!paciente) throw new Error('Não foi possível encontrar o paciente')

    if(paciente?.thumbnail) {
      const Key = paciente?.thumbnail?.split('/pacientes/').pop() || ''   
      const params = {
        Bucket: process.env.BUCKET_NAME || '',
        Key: `pacientes/${Key}`
      }
      
      await this.storage.deleteObject(params, err => {
        err && console.log(err)
        if (err) throw new Error('Não foi possível remover a thumbnail do paciente')
      }).promise()
    }

    paciente.anexo.forEach(async (anexo: Anexo) => {
      const Key = anexo?.data.split('/pacientes/').pop() || ''    
      const params = {
        Bucket: process.env.BUCKET_NAME || '',
        Key: `pacientes/${Key}`
      }
      await this.storage.deleteObject(params, err => {
        err && console.log(err)
        if (err) throw new Error('Não foi possível remover o anexo')
      }).promise()
    })
    
    await this.PacienteRepository.delete(query);
  }
}