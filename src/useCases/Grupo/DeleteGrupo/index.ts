import { GruposRepository } from '../../../repositories/GruposRepository'
import { DeleteGrupoUseCase } from './DeleteGrupoUseCase'
import { DeleteGrupoController } from './DeleteGrupoController'

const gruposRepository = new GruposRepository()
const deleteGrupoUseCase = new DeleteGrupoUseCase(gruposRepository)
const deleteGrupoController = new DeleteGrupoController(deleteGrupoUseCase)

export { deleteGrupoController }
