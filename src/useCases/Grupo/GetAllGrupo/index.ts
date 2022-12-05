import { GruposRepository } from '../../../repositories/GruposRepository'
import { GetAllGrupoUseCase } from './GetAllGrupoUseCase'
import { GetAllGrupoController } from './GetAllGrupoController'

const gruposRepository = new GruposRepository()
const getAllGrupoUseCase = new GetAllGrupoUseCase(gruposRepository)
const getAllGrupoController = new GetAllGrupoController(getAllGrupoUseCase)

export { getAllGrupoController }
