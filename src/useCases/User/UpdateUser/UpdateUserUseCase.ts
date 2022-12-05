import { IUserRepository } from "../../../repositories/UsersRepository";
import { IUpdateUserDTO } from "./UpdateUserDTO";

export interface IUpdateUserUseCase {
  execute(id: string, data: IUpdateUserDTO): Promise<void>;
}

export class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor(private usersRepository: IUserRepository) {}

  async execute(id: string, data: IUpdateUserDTO) {
    const response = await this.usersRepository.update(id, data);
    if (!response)
      throw new Error(
        "Houve um erro ao processar a alteração! Tente novamente mais tarde!"
      );
  }
}
