import { UsersRepository } from '../../../repositories/UsersRepository'
import { GetAllUserUseCase } from './GetAllUserUseCase'
import { GetAllUserController } from './GetAllUserController'

const usersRepository = new UsersRepository()
const getAllUserUseCase = new GetAllUserUseCase(usersRepository)
const getAllUserController = new GetAllUserController(getAllUserUseCase)

export { getAllUserController }
