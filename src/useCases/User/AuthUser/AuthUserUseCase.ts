import { User } from "./../../../entities/User";
import { IAuthUserDTO } from "./AuthUserDTO";
import { IUserRepository } from '../../../repositories/UsersRepository'
import bcrypt from 'bcrypt'

export interface IAuthUserUseCase {
  execute(data: IAuthUserDTO): Promise<Omit<User, 'password'>>
}

export class AuthUserUseCase implements IAuthUserUseCase {
  constructor (private usersRepository: IUserRepository) {}

  async execute (data: IAuthUserDTO) {
    const { user, password } = data
    if(!user || !password) {
      throw new Error('Por favor informe um usuário e uma senha para autenticação!')
    }
    
    const response = await this.usersRepository.getOne<{ user: string }>({ user })
    const { password:pwd, ...userData } = response.toObject()

    if(Object.keys(userData).length <= 0) {
      throw new Error('Usuário ou senha incorretos!')
    }

    if(!bcrypt.compareSync(password, pwd)){
      throw new Error('Usuário ou senha incorretos!')
    }
    

    return userData
  }
}
