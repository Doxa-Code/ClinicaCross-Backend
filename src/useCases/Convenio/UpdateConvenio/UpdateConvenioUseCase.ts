import { S3 } from "aws-sdk";
import { ConvenioDocument } from "../../../schemas/ConvenioSchema";
import { FilterQuery } from "mongoose";
import { Convenio } from "../../../entities/Convenio";
import { UpdateConvenioDTO } from "./UpdateConvenioDTO";
import { IConvenioRepository } from "../../../repositories/ConvenioRepository";

export interface IUpdateConvenioUseCase {
  execute(data: UpdateConvenioDTO, query: FilterQuery<ConvenioDocument>): Promise<Convenio | null>
}

export class UpdateConvenioUseCase implements IUpdateConvenioUseCase {
  constructor(private convenioRepository: IConvenioRepository, private storage: S3) {}
  
  async execute(data: UpdateConvenioDTO, query: FilterQuery<ConvenioDocument>) {
    const convenioOld = await this.convenioRepository.show(query)
    if(convenioOld && data.thumbnail && convenioOld.thumbnail) {
      const Key = convenioOld?.thumbnail?.split('/convenios/').pop() || ''   
      const params = {
        Bucket: process.env.BUCKET_NAME || '',
        Key: `convenios/${Key}`
      }
      
      await this.storage.deleteObject(params, err => {
        err && console.log(err)
        if (err) throw new Error('Não foi possível remover a thumbnail do convenio')
      }).promise()
    }
    const convenioDTO = new Convenio(data)
    await this.convenioRepository.update(convenioDTO, query)
    const convenio = await this.convenioRepository.show(query)
    if(!convenio) return null
    return convenio
  }
}