import { GetConfiguracaoUseCase } from "./GetConfiguracaoUseCase";
import { GetConfiguracaoController } from "./GetConfiguracaoController";
import { ConfiguracaoRepository } from "../../../repositories/ConfiguracaoRepository";


const configuracaoRepository = new ConfiguracaoRepository()
const getConfiguracaoUseCase = new GetConfiguracaoUseCase(configuracaoRepository)
const getConfiguracaoController = new GetConfiguracaoController(getConfiguracaoUseCase)

export { getConfiguracaoController }