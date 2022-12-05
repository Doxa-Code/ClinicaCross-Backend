import { UsersRepository } from '../../../repositories/UsersRepository'
import { AuthUserUseCase } from './AuthUserUseCase'
import { AuthUserController } from './AuthUserController'

const usersRepository = new UsersRepository()
const authUserUseCase = new AuthUserUseCase(usersRepository)
const authUserController = new AuthUserController(authUserUseCase)

export { authUserController }
