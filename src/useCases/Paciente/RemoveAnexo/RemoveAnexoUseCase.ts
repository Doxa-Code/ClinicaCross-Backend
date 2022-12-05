import { Anexo } from '../../../entities/Paciente'
import { IPacienteRepository } from '../../../repositories/PacienteRepository'
import { S3 } from 'aws-sdk'

export interface IRemoveAnexoUseCase {
  execute(id: string, pacienteId: string): Promise<Anexo[]>
}

export class RemoveAnexoUseCase implements IRemoveAnexoUseCase {
  constructor (private pacientesRepository: IPacienteRepository, private storage: S3) {}

  async execute (id: string, pacienteId: string) {
    const pacienteOld = await this.pacientesRepository.show({ _id: pacienteId })

    const anexoRemoved = pacienteOld?.anexo.find(anexo => anexo._id.toString() === id)
    const Key = anexoRemoved?.data.split('/pacientes/').pop() || ''    
    const params = {
      Bucket: process.env.BUCKET_NAME || '',
      Key: `pacientes/${Key}`
    }
    await this.storage.deleteObject(params, err => {
      err && console.log(err)
      if (err) throw new Error('Não foi possível remover o anexo')
    }).promise()

    const response = await this.pacientesRepository.removeAnexo(id, pacienteId)
    if (!response) throw new Error('Não foi possível remover o anexo')

    const paciente = await this.pacientesRepository.show({ _id: pacienteId })
    if(!paciente) throw new Error('Não foi possível encontrar o paciente')
    
    return paciente?.anexo
  }
}
