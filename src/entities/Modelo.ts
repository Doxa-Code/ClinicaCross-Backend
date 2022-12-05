export type Tipo = "Receita" | "Atestado" | "Declaracao";
export class Modelo {
  public nome!: string;
  public corpo!: string;
  public tipo!: Tipo;

  constructor(props: Modelo) {
    Object.assign(this, props);
  }
}
