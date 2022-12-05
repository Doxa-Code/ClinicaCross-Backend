export class Transacao {
  public destinatario!: string
  public remetente!: string
  public mensagem!: string
  public valor!: number
  public tipo!: 'Receita' | 'Despesa'
  public data!: string
}

export class User {
  
  public nome!: string;
  public user!: string;
  public password!: string;
  public grupo!: string | undefined;
  public ativo!: boolean;
  public linked!: string | undefined;
  public valor!: number;
  public transacoes!: Transacao[];

  constructor (props: any) {
    Object.assign(this, props)
  }
}
