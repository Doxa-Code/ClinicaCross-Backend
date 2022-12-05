import { UsersRepository } from '../../../repositories/UsersRepository'
import { DeleteUserUseCase } from './DeleteUserUseCase'
import { DeleteUserController } from './DeleteUserController'

const usersRepository = new UsersRepository()
const deleteUserUseCase = new DeleteUserUseCase(usersRepository)
const deleteUserController = new DeleteUserController(deleteUserUseCase)

export { deleteUserController }
