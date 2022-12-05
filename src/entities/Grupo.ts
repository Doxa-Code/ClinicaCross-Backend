export class Grupo {
  public nome!: string;
  public adm!: boolean;
  public bloqueiaHorario!: boolean;
  public acessos!: string[];

  constructor(props: Grupo) {
    Object.assign(this, props);
  }
}
