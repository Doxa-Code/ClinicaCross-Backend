import { GruposRepository } from '../../../repositories/GruposRepository'
import { UpdateGrupoUseCase } from './UpdateGrupoUseCase'
import { UpdateGrupoController } from './UpdateGrupoController'

const gruposRepository = new GruposRepository()
const updateGrupoUseCase = new UpdateGrupoUseCase(gruposRepository)
const updateGrupoController = new UpdateGrupoController(updateGrupoUseCase)

export { updateGrupoController }
