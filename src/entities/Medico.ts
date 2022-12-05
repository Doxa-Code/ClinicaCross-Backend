interface IRepasse {
  convenio: string;
  porcentagem: string;
}

export class Medico {
  public shortSchedule!: boolean;
  public bloco!: number;
  public sigla!: string;
  public nome!: string;
  public conselhoProfissional!: string;
  public numeroConselhoProfissional!: string;
  public cbos!: string;
  public cor!: string;
  public especialidade!: string;
  public codigo!: string;
  public UF!: string;
  public diasDaSemana!: number[];
  public repasse!: IRepasse[];

  constructor(props: Medico) {
    Object.assign(this, props);
  }
}
