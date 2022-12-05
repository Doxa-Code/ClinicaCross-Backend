import { Consumer, Producer } from "kafkajs";
import { Server } from 'socket.io'

declare global {
    namespace Express {
        interface Request {
            io? : Record<Server>
            producer? : Record<Producer>
        }
    }
}
