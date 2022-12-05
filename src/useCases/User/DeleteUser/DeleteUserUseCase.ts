import { IUserRepository } from '../../../repositories/UsersRepository'
import { IDeleteUserDTO } from './DeleteUserDTO'

export interface IDeleteUserUseCase {
  execute(data: IDeleteUserDTO): Promise<void>
}

export class DeleteUserUseCase implements IDeleteUserUseCase {
  constructor (private UsersRepository: IUserRepository) {}

  async execute (data: IDeleteUserDTO) {
    const response = await this.UsersRepository.delete(data._id)
    if (!response) {
      throw new Error('Houve um erro ao tentar remover o registro! Tente novamente mais tarde!')
    }
  }
}
