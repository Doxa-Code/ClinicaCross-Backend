import { User } from '../../../entities/User'
import { IUserRepository } from '../../../repositories/UsersRepository'

export interface IGetAllUserUseCase {
  execute(): Promise<Omit<User, 'password'>[]>
}

export class GetAllUserUseCase implements IGetAllUserUseCase {
  constructor (private usersRepository: IUserRepository) {}

  async execute() {
    const response = await this.usersRepository.getAll();
    if(!response) {
      throw new Error("Houve um erro ao buscar os dados! Tente novamente mais tarde!")
    }
    return response.map(item => {
      const { password, ...user } = item.toObject()
      return user
    })
  }
}
