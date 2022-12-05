import { GuiaSADTService } from "./../../../services/GuiaSADTService";
import { ConfiguracaoRepository } from "./../../../repositories/ConfiguracaoRepository";
import { FaturamentoRepository } from "./../../../repositories/FaturamentoRepository";
import { GetGuiaSADTUseCase } from './GetGuiaSADTUseCase'
import { GetGuiaSADTController } from './GetGuiaSADTController'

const faturamentosRepository = new FaturamentoRepository()
const configuracaoRepository = new ConfiguracaoRepository()
const guiaSADTService = new GuiaSADTService()
const getGuiaSADTUseCase = new GetGuiaSADTUseCase(faturamentosRepository, configuracaoRepository, guiaSADTService)
const getGuiaSADTController = new GetGuiaSADTController(getGuiaSADTUseCase)

export { getGuiaSADTController }
