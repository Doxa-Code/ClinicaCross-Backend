import { User } from '../../../entities/User'
import { IUserRepository } from '../../../repositories/UsersRepository'

export interface IGetByIdUserUseCase {
  execute(id: string): Promise<Omit<User, 'password'>>
}

export class GetByIdUserUseCase implements IGetByIdUserUseCase {
  constructor (private usersRepository: IUserRepository) {}

  async execute (id: string) {
    const response = await this.usersRepository.getOneWithTransitions<{ _id: string }>({ _id: id })
    if (!response) {
      throw new Error('Houve um erro ao buscar os dados! Tente novamente mais tarde!')
    }
    const { password, ...user } = response
    return user
  }
}
