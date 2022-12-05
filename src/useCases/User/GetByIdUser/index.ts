import { UsersRepository } from '../../../repositories/UsersRepository'
import { GetByIdUserUseCase } from './GetByIdUserUseCase'
import { GetByIdUserController } from './GetByIdUserController'

const usersRepository = new UsersRepository()
const getByIdUserUseCase = new GetByIdUserUseCase(usersRepository)
const getByIdUserController = new GetByIdUserController(getByIdUserUseCase)

export { getByIdUserController }
