import { SetConfiguracaoController } from "./SetConfiguracaoController";
import { SetConfiguracaoUseCase } from "./SetConfiguracaoUseCase";
import { ConfiguracaoRepository } from "../../../repositories/ConfiguracaoRepository";

const configuracaoRepository = new ConfiguracaoRepository();
const setConfiguracaoUseCase = new SetConfiguracaoUseCase(configuracaoRepository);
const setConfiguracaoController = new SetConfiguracaoController(setConfiguracaoUseCase);

export { setConfiguracaoController }