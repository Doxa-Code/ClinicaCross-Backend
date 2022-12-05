import { UserDocument } from "./../schemas/UserSchema";
import { User } from '../entities/User'
import UserModel from '../schemas/UserSchema'

export interface IUserRepository {
  save(data: User): Promise<UserDocument>
  getAll(): Promise<UserDocument[]>
  getOne<T>(data: T): Promise<UserDocument>
  getOneWithTransitions<T>(data: T): Promise<User>
  update(id: string, data: User): Promise<Boolean>
  delete(id: string): Promise<Boolean>
}

export class UsersRepository implements IUserRepository {
  async save (data: User) {
    const user = new User(data)
    const response = await UserModel.create(user);
    return response
  }
  
  async getAll (){
    return await UserModel.find()
  }
  async getOne<T>(data: T) {
    const response = await UserModel.findOne(data)
    if(!response) {
      throw new Error('Houve um erro ao autenticar! tente novamente mais tarde!')
    }
    return response
  }
  async getOneWithTransitions<T>(data: T) {
    const response = await UserModel.findOne(data).select('+transicoes')
    if(!response) {
      throw new Error('Houve um erro ao autenticar! tente novamente mais tarde!')
    }
    return response.toObject()
  }

  async update (id: string, data: User) {
    const response = await UserModel.updateOne({ _id: id }, { $set: data })
    return response.nModified > 0
  }

  async delete (id: string) {
    const { deletedCount } = await UserModel.deleteOne({ _id: id })
    if (!deletedCount) return false
    return deletedCount > 0
  }
  
}
