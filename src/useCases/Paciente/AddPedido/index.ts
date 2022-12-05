import { PacienteRepository } from '../../../repositories/PacienteRepository'
import { AddPedidoUseCase } from './AddPedidoUseCase'
import { AddPedidoController } from './AddPedidoController'

const pacientesRepository = new PacienteRepository()
const addPedidoUseCase = new AddPedidoUseCase(pacientesRepository)
const addPedidoController = new AddPedidoController(addPedidoUseCase)

export { addPedidoController }
