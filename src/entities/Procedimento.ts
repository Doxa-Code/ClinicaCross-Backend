export class Procedimento {
  public readonly _id!: string;
  public descricaoProcedimento!: string;
  public codigoDespesa!: string;
  public codigoTabela!: string;
  public codigoProcedimento!: string;
  public unidadeMedida!: string;
  constructor(props: any) {
    Object.assign(this, props);
  }
}
