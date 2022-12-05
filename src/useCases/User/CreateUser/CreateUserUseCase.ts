import { User } from '../../../entities/User'
import { IUserRepository } from '../../../repositories/UsersRepository'
import { ICreateUserDTO } from './CreateUserDTO'

export interface ICreateUserUseCase {
  execute(data: ICreateUserDTO): Promise<Omit<User, 'password'>>
}

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor (private usersRepository: IUserRepository) {}

  async execute (data: ICreateUserDTO) {
    const userDTO = new User(data)
    const response = await this.usersRepository.save(userDTO)
    if(!response) {
      throw new Error('Houve um erro ao processar o cadastro! Tente novamente mais tarde!')
    }
    const { password, ...user } = response.toObject()
    return user
  }
}
