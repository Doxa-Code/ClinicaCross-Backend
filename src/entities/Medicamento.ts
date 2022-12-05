export class Medicamento {
  public codigo!: string;
  public nome!: string;
  public tipo!: string;
  public descricao!: string;

  constructor(props: Medicamento) {
    Object.assign(this, props);
  }
}
