import { Guia } from "../../entities/Guia";
import GeradorDePdf from './GeradorDePdf'

export class GeradorGuiaSPSADT {
  gerarPdf (guia: Guia) {
    return new GeradorDePdf(guia).gerar()
  }
}
