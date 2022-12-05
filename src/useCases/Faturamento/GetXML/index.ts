import { XmlService } from "./../../../services/XmlService";
import { ConfiguracaoRepository } from "../../../repositories/ConfiguracaoRepository";
import { FaturamentoRepository } from "../../../repositories/FaturamentoRepository";
import { GetGetXMLUseCase } from './GetXMLUseCase'
import { GetGetXMLController } from './GetXMLController'

const faturamentosRepository = new FaturamentoRepository()
const configuracaoRepository = new ConfiguracaoRepository()
const xmlService = new XmlService()
const getXMLUseCase = new GetGetXMLUseCase(faturamentosRepository, configuracaoRepository, xmlService)
const getXMLController = new GetGetXMLController(getXMLUseCase)

export { getXMLController }
