import { GruposRepository } from '../../../repositories/GruposRepository'
import { CreateGrupoUseCase } from './CreateGrupoUseCase'
import { CreateGrupoController } from './CreateGrupoController'

const gruposRepository = new GruposRepository()
const createGrupoUseCase = new CreateGrupoUseCase(gruposRepository)
const createGrupoController = new CreateGrupoController(createGrupoUseCase)

export { createGrupoController }
