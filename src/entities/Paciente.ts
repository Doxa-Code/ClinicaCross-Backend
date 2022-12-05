export class Anexo {
  public readonly _id!: string;
  public responsavel!: any;
  public data!: string;
  public nome!: string;

  constructor(props: Anexo) {
    Object.assign(this, props);
  }
}

export class Prontuario {
  public readonly _id!: string;
  public responsavel!: any;
  public data!: string;

  constructor(props: Prontuario) {
    Object.assign(this, props);
  }
}

export class Atestado {
  public readonly _id!: string;
  public titulo!: string;
  public responsavel!: any;
  public data!: string;

  constructor(props: Atestado) {
    Object.assign(this, props);
  }
}

export class Receita {
  public readonly _id!: string;
  public titulo!: string;
  public responsavel!: any;
  public data!: string;

  constructor(props: Receita) {
    Object.assign(this, props);
  }
}

export class Exame {
  public readonly _id!: string;
  public titulo!: string;
  public responsavel!: any;
  public data!: string;

  constructor(props: Exame) {
    Object.assign(this, props);
  }
}

export class Laudo {
  public readonly _id!: string;
  public titulo!: string;
  public responsavel!: any;
  public data!: string;

  constructor(props: Laudo) {
    Object.assign(this, props);
  }
}

export class Pedido {
  public readonly _id!: string;
  public titulo!: string;
  public responsavel!: any;
  public data!: string;

  constructor(props: Pedido) {
    Object.assign(this, props);
  }
}

export class Declaracao {
  public readonly _id!: string;
  public titulo!: string;
  public responsavel!: any;
  public data!: string;

  constructor(props: Declaracao) {
    Object.assign(this, props);
  }
}

export class Paciente {
  public readonly _id!: string;
  public codigo!: string;
  public thumbnail!: string;
  public nome!: string;
  public cpf!: string;
  public rg!: string;
  public dataNascimento!: string;
  public cns!: string;
  public identificador!: string;
  public whatsapp!: string;
  public telefone!: string;
  public cep!: string;
  public rua!: string;
  public numero!: string;
  public bairro!: string;
  public complemento!: string;
  public cidade!: string;
  public uf!: string;
  public laudo!: Laudo[];
  public pedido!: Pedido[];
  public receita!: Receita[];
  public exame!: Exame[];
  public atestado!: Atestado[];
  public declaracao!: Declaracao[];
  public prontuario!: Prontuario[];
  public anexo!: Anexo[];

  constructor(props: Paciente) {
    Object.assign(this, props);
  }
}
