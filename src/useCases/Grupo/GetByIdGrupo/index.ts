import { GruposRepository } from '../../../repositories/GruposRepository'
import { GetByIdGrupoUseCase } from './GetByIdGrupoUseCase'
import { GetByIdGrupoController } from './GetByIdGrupoController'

const gruposRepository = new GruposRepository()
const getByIdGrupoUseCase = new GetByIdGrupoUseCase(gruposRepository)
const getByIdGrupoController = new GetByIdGrupoController(getByIdGrupoUseCase)

export { getByIdGrupoController }
