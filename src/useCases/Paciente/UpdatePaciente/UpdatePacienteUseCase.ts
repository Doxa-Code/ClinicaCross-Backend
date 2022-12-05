import { S3 } from "aws-sdk";
import { PacienteDocument } from "../../../schemas/PacienteSchema";
import { FilterQuery } from "mongoose";
import { Paciente } from "../../../entities/Paciente";
import { UpdatePacienteDTO } from "./UpdatePacienteDTO";
import { IPacienteRepository } from "../../../repositories/PacienteRepository";

export interface IUpdatePacienteUseCase {
  execute(data: UpdatePacienteDTO, query: FilterQuery<PacienteDocument>): Promise<Paciente>
}

export class UpdatePacienteUseCase implements IUpdatePacienteUseCase {
  constructor(private pacienteRepository: IPacienteRepository, private storage: S3) {}
  
  async execute(data: UpdatePacienteDTO, query: FilterQuery<PacienteDocument>) {
    const pacienteOld = await this.pacienteRepository.show(query)
    if(pacienteOld && data.thumbnail && pacienteOld.thumbnail) {
      const Key = pacienteOld?.thumbnail?.split('/pacientes/').pop() || ''   
      const params = {
        Bucket: process.env.BUCKET_NAME || '',
        Key: `pacientes/${Key}`
      }
      
      await this.storage.deleteObject(params, err => {
        err && console.log(err)
        if (err) throw new Error('Não foi possível remover a thumbnail do paciente')
      }).promise()
    }
    const pacienteDTO = new Paciente(data)
    await this.pacienteRepository.update(pacienteDTO, query)

    const paciente = await this.pacienteRepository.show(query)
    if(!paciente) throw new Error('Paciente não encontrado')

    return paciente
  }
}