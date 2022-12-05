import { Guia } from "../../entities/Guia";
import path from 'path'
import PdfKit from 'pdfkit'
import { IField, IFieldProps, ILayout, IOpcoes, ISection, ITitle, IWrite, IRectProps, IValueProps } from './GeradorDePdf.d'

class GeradorDePdf {
  private guia!: Guia
  private pdf!: PDFKit.PDFDocument
  private x: number = 0
  private y: number = 0
  private static layout: ILayout = {
    MT: 10,
    ML: 10,
    MR: 10,
    GAP: 2,
    WIDTH: 841.68,
    HEIGHT: 595.44,
  }
  private static field: IField = {
    LINE_WIDTH: 0.5,
    HEIGHT: 22,
    width: {
      NORMAL: 80,
      VERY_SHORT: 25,
      SHORT: 50,
      MIDDLE: 90,
      LARGE: 120,
      LARGE_MIDDLE: 150,
      VERY_LARGE: 220,
      ABSTRACT: {
        nome: 370,
        indicacao: 535
      }
    },
    ALIGN: "center",
    COLOR: 'black',
    BACKGROUND: '#dedede',
    fontSize: {
      NORMAL: 8,
      SHORT: 6,
      ABSTRACT: {
        numeroGuia: 14
      }
    }
  }
  private static section: ISection = {
    HEIGHT: 8 ,
    FONT_SIZE: 5.5,
    COLOR: 'black'
  }
  private static title: ITitle = {
    WIDTH: 540,
    FONT_SIZE: 10,
    COLOR: 'black',
    ALIGN: "center"
  }
  private opcoes: IOpcoes = {
    autor: 'Doxa Code',
    titulo: 'GUIA DE SERVIÇO PROFISSIONAL / SERVIÇO AUXILIAR DE DIAGNÓSTICO E TERAPIA - SP /SADT',
    criador: 'Cloud Med',
    layout: 'landscape',
    creditos: '',
    produzidoPor: "Cloud Med"
  }
  
  constructor (guia: Guia) {
    this.guia = guia
    this.pdf = new PdfKit({
      bufferPages: true,
      margin: 0,
      layout: this.opcoes.layout,
      size: [
        GeradorDePdf.layout.HEIGHT,
        GeradorDePdf.layout.WIDTH
      ],
      info: {
        Author: this.opcoes.autor,
        Title: this.opcoes.titulo,
        Creator: this.opcoes.criador,
        Producer: this.opcoes.produzidoPor
      }
    })

    this.pdf.lineWidth(GeradorDePdf.field.LINE_WIDTH)


    const FONTES_DIR = path.join(__dirname, '../fontes')
    const TIMES_NEW_ROMAN = path.join(FONTES_DIR, 'Times New Roman.ttf')
    const TIMES_NEW_ROMAN_NEGRITO = path.join(FONTES_DIR, 'Times New Roman Bold.ttf')
    const TIMES_NEW_ROMAN_ITALICO = path.join(FONTES_DIR, 'Times New Roman Italic.ttf')
    const TIMES_NEW_ROMAN_NEGRITO_ITALICO = path.join(FONTES_DIR, 'Times New Roman Bold Italic.ttf')

    this.pdf.registerFont('normal', TIMES_NEW_ROMAN)
    this.pdf.registerFont('negrito', TIMES_NEW_ROMAN_NEGRITO)
    this.pdf.registerFont('italico', TIMES_NEW_ROMAN_ITALICO)
    this.pdf.registerFont('negrito-italico', TIMES_NEW_ROMAN_NEGRITO_ITALICO)

    if (this.opcoes.stream) {
      this.pdf.pipe(this.opcoes.stream)
    }
  }
  
  gerar () {
    this.x += GeradorDePdf.layout.ML
    this.y += GeradorDePdf.layout.MT
    this.logotipo()

    this.x += GeradorDePdf.field.width.NORMAL + GeradorDePdf.layout.GAP
    this.write({
      text: this.opcoes.titulo,
      fontSize: GeradorDePdf.title.FONT_SIZE,
      align: GeradorDePdf.title.ALIGN,
      color: GeradorDePdf.title.COLOR,
      width: GeradorDePdf.title.WIDTH,
      fontType: 'negrito'
    })
    this.x += GeradorDePdf.title.WIDTH + GeradorDePdf.layout.GAP
    this.write({
      text: '2 - Nº',
      align: 'left',
      fontSize: GeradorDePdf.field.fontSize.SHORT,
      fontType: 'normal',
      color: GeradorDePdf.title.COLOR,
      width: GeradorDePdf.field.width.VERY_SHORT,
      lineGap: -1.5
    })

    this.x += GeradorDePdf.field.width.VERY_SHORT + GeradorDePdf.layout.GAP
    this.write({
      text: this.guia.autorizacao.numeroGuia,
      align: 'left',
      width: GeradorDePdf.field.width.VERY_LARGE,
      fontSize: GeradorDePdf.field.fontSize.ABSTRACT.numeroGuia,
      color: GeradorDePdf.title.COLOR,
      fontType: 'negrito'
    })

    this.x = 0
    this.y = 40
    this.field({
      title: '1 - Registro ANS',
      value: this.guia.autorizacao.registroANS,
      width: {
        value: GeradorDePdf.field.width.NORMAL,
      },
    })
    
    
    this.x += GeradorDePdf.field.width.NORMAL + GeradorDePdf.layout.GAP
    this.field({
      title: '3 - Nº Guia Principal',
      value: this.guia.autorizacao.numeroGuiaPrincipal,
      width: {
        value: GeradorDePdf.field.width.VERY_LARGE,
      },
      background: GeradorDePdf.field.BACKGROUND
    })

    this.x += GeradorDePdf.field.width.VERY_LARGE + GeradorDePdf.layout.GAP
    this.field({
      title: '4 - Data da Autorização',
      value: this.guia.autorizacao.dataAutorizacao,
      width: {
        value: GeradorDePdf.field.width.NORMAL,
      },
      background: GeradorDePdf.field.BACKGROUND
    })

    this.x += GeradorDePdf.field.width.NORMAL + GeradorDePdf.layout.GAP
    this.field({
      title: '5 - Senha',
      value: this.guia.autorizacao.senha,
      width:{
        value: GeradorDePdf.field.width.VERY_LARGE
      },
      background: GeradorDePdf.field.BACKGROUND
    })
    
    
    this.x += GeradorDePdf.field.width.VERY_LARGE + GeradorDePdf.layout.GAP
    this.field({
      title: '6 - Data Validade da Senha',
      value: this.guia.autorizacao.validadeSenha,
      width: {
        value: GeradorDePdf.field.width.NORMAL,
      },
      background: GeradorDePdf.field.BACKGROUND
    })

    
    this.x += GeradorDePdf.field.width.NORMAL + GeradorDePdf.layout.GAP
    this.field({
      title: '7 - Data de Emissão da Guia',
      value: this.guia.autorizacao.dataEmissao,
      width: {
        value: GeradorDePdf.field.width.NORMAL,
      }
    })

    this.y += GeradorDePdf.field.HEIGHT + GeradorDePdf.layout.GAP
    this.section('Dados do Beneficiário')

    this.y += GeradorDePdf.section.HEIGHT + GeradorDePdf.layout.GAP
    this.x = 0
    this.field({
      title: '8 - Número da Carteira',
      value: this.guia.beneficiario.convenio.numeroCarteira,
      width: {
        value: GeradorDePdf.field.width.LARGE,
      }
    })
    
    
    this.x += GeradorDePdf.field.width.LARGE + GeradorDePdf.layout.GAP
    this.field({
      title: '9 - Plano',
      value: this.guia.beneficiario.convenio.nomeDoPlano,
      width:{
        value:GeradorDePdf.field.width.LARGE
      }
    })

    
    this.x += GeradorDePdf.field.width.LARGE + GeradorDePdf.layout.GAP
    this.field({
      title: '10 - Validade da Carteira',
      value: this.guia.beneficiario.convenio.validadeCarteira,
      width: {
        value: GeradorDePdf.field.width.NORMAL,
      },
      background: GeradorDePdf.field.BACKGROUND
    })  

    this.x += GeradorDePdf.field.width.NORMAL + GeradorDePdf.layout.GAP
    this.field({
      title: '11 - Nome',
      value: this.guia.beneficiario.nome,
      width: {
        value: GeradorDePdf.field.width.ABSTRACT.nome
      }
    })
    
    
    this.x += GeradorDePdf.field.width.ABSTRACT.nome + GeradorDePdf.layout.GAP
    this.field({
      title: '12 - Número do Cartão Nacional de Saúde',
      value: this.guia.beneficiario.numeroCartaoNacionalSaude,
      width: {
        value:  GeradorDePdf.field.width.LARGE + 3
      },
      background: GeradorDePdf.field.BACKGROUND
    })


    this.y += GeradorDePdf.field.HEIGHT + GeradorDePdf.layout.GAP
    this.section('Dados do Contratado Solicitante')

    this.y += GeradorDePdf.section.HEIGHT + GeradorDePdf.layout.GAP
    this.x = 0
    this.field({
      title:'13 - Código na Operadora / CPF / CNPJ',
      value: this.guia.contratadoSolicitante.documentoSolicitante,
      width:{
        value:GeradorDePdf.field.width.LARGE
      }
    })
    
    this.x += GeradorDePdf.field.width.LARGE + GeradorDePdf.layout.GAP
    this.field({
      title: '14 - Nome do Contratado',
      value: this.guia.contratadoSolicitante.nome,
      width: {
        value: GeradorDePdf.field.width.ABSTRACT.nome,
      }
    })
    
    this.x += GeradorDePdf.field.width.ABSTRACT.nome + GeradorDePdf.layout.GAP
    this.field({
      title: '15 - Código CNES',
      value: this.guia.contratadoSolicitante.cnes,
      width: {
        value: GeradorDePdf.field.width.NORMAL,
      },
      background: GeradorDePdf.field.BACKGROUND
    })
    
    this.x += GeradorDePdf.field.width.NORMAL + GeradorDePdf.layout.GAP
    this.field({
      title: 'CoParticipação',
      value: this.guia.beneficiario.coParticipacao ? 'SIM' : 'NÃO',
      width: {
        value: GeradorDePdf.field.width.NORMAL
      }
    })
    
    this.y += GeradorDePdf.field.HEIGHT + GeradorDePdf.layout.GAP
    this.x = 0
    this.field({
      title: '16 - Nome do Profissional Solicitante',
      value: this.guia.contratadoSolicitante.profissionalSolicitante.nome,
      width: {
        value: GeradorDePdf.field.width.ABSTRACT.nome
      },
      background: GeradorDePdf.field.BACKGROUND
    })

    this.x += GeradorDePdf.field.width.ABSTRACT.nome + GeradorDePdf.layout.GAP
    this.field({
      title: '17 - Conselho Profissional',
      value: this.guia.contratadoSolicitante.profissionalSolicitante.conselho,
      width: {
        value: GeradorDePdf.field.width.NORMAL
      }
    })
    
    this.x += GeradorDePdf.field.width.NORMAL + GeradorDePdf.layout.GAP
    this.field({
      title:'18 - Número do Conselho',
      value: this.guia.contratadoSolicitante.profissionalSolicitante.numeroConselho,
      width:{
        value:GeradorDePdf.field.width.NORMAL
      }
    })

    this.x += GeradorDePdf.field.width.NORMAL + GeradorDePdf.layout.GAP
    this.field({
      title: '19 - UF',
      value: this.guia.contratadoSolicitante.profissionalSolicitante.ufConselho,
      width: {
        value: GeradorDePdf.field.width.SHORT
      }
    })
    
    this.x += GeradorDePdf.field.width.SHORT + GeradorDePdf.layout.GAP
    this.field({
      title: "20 - Código CBO S",
      value: this.guia.contratadoSolicitante.profissionalSolicitante.cbo,
      width: {
        value: GeradorDePdf.field.width.NORMAL
      }
    })

    this.y += GeradorDePdf.field.HEIGHT + GeradorDePdf.layout.GAP
    this.section('Dados da Solicitação / Procedimentos e Exames Solicitados')

    this.y += GeradorDePdf.section.HEIGHT + GeradorDePdf.layout.GAP
    this.x = 0
    this.field({
      title:'21 - Data / Hora da Solicitação',
      value: this.guia.solicitacao.dataHora,
      width:{
        value:GeradorDePdf.field.width.LARGE
      },
      background:GeradorDePdf.field.BACKGROUND
    })
    
    
    this.x += GeradorDePdf.field.width.LARGE + GeradorDePdf.layout.GAP
    this.field({
      title: '22 - Caráter da Solicitação',
      value: this.guia.solicitacao.carater,
      width: {
        value: GeradorDePdf.field.width.NORMAL
      }
    })
    
    this.x += GeradorDePdf.field.width.NORMAL + GeradorDePdf.layout.GAP
    this.field({
      title: '23 - CID 10',
      value: this.guia.solicitacao.cid10,
      width: {
        value: GeradorDePdf.field.width.NORMAL
      },
      background: GeradorDePdf.field.BACKGROUND
    })

    this.x += GeradorDePdf.field.width.NORMAL + GeradorDePdf.layout.GAP
    this.field({
      title: '24 - Indicação clínica',
      value: this.guia.solicitacao.indicacao,
      width: {
        value: GeradorDePdf.field.width.ABSTRACT.indicacao
      },
      background: GeradorDePdf.field.BACKGROUND
    })

    this.y += GeradorDePdf.field.HEIGHT + GeradorDePdf.layout.GAP
    this.x = 0

    this.rect({
      width: 3 * (GeradorDePdf.field.width.NORMAL + GeradorDePdf.layout.GAP),
      height: 5 * (GeradorDePdf.section.HEIGHT + 2 * GeradorDePdf.layout.GAP),
      background: GeradorDePdf.field.BACKGROUND
    })

    this.rect({
      x:  3 * (GeradorDePdf.field.width.NORMAL + GeradorDePdf.layout.GAP),
      width: GeradorDePdf.layout.WIDTH - GeradorDePdf.layout.ML - (3 * (GeradorDePdf.field.width.NORMAL + GeradorDePdf.layout.GAP)),
      height: 5 * (GeradorDePdf.section.HEIGHT + 2 * GeradorDePdf.layout.GAP),
    })

    this.x += GeradorDePdf.layout.ML + GeradorDePdf.layout.GAP
    this.y += GeradorDePdf.layout.MT + GeradorDePdf.layout.GAP
    
    this.write({
      fontType: 'negrito',
      text: '25 - Tabela',
      align: 'left',
      width: GeradorDePdf.field.width.NORMAL,
      color: GeradorDePdf.field.COLOR,
      fontSize: GeradorDePdf.field.fontSize.SHORT
    })
    
    this.x += GeradorDePdf.field.width.LARGE_MIDDLE + GeradorDePdf.layout.GAP

    this.write({
      fontType: 'negrito',
      text:'26 - Código do Procedimento',
      align: 'left',
      width: GeradorDePdf.field.width.NORMAL,
      color: GeradorDePdf.field.COLOR,
      fontSize: GeradorDePdf.field.fontSize.SHORT
    })

    this.x += GeradorDePdf.layout.ML + GeradorDePdf.field.width.NORMAL + GeradorDePdf.layout.GAP
    this.write({
      fontType: 'negrito',
      text: '27 - Descrição',
      align: 'left',
      width: GeradorDePdf.field.width.VERY_LARGE,
      color: GeradorDePdf.field.COLOR,
      fontSize: GeradorDePdf.field.fontSize.SHORT
    })
    
    this.x += GeradorDePdf.field.width.VERY_LARGE + GeradorDePdf.layout.GAP
    this.write({
      fontType: 'negrito',
      text: '28 - Quatidade Solicitada',
      align: 'left',
      width: GeradorDePdf.field.width.NORMAL,
      color: GeradorDePdf.field.COLOR,
      fontSize: GeradorDePdf.field.fontSize.SHORT
    })
    
    this.x += GeradorDePdf.field.width.NORMAL + GeradorDePdf.layout.GAP
    this.write({
      fontType: 'negrito',
      text: '29 - Quatidade Autorizada',
      align: 'left',
      width: GeradorDePdf.field.width.NORMAL,
      color: GeradorDePdf.field.COLOR,
      fontSize: GeradorDePdf.field.fontSize.SHORT
    })

    this.guia.solicitacao.procedimentos.forEach(procedimento => {
      this.y += GeradorDePdf.section.HEIGHT + GeradorDePdf.layout.GAP
      this.x = GeradorDePdf.layout.ML + GeradorDePdf.layout.GAP
      this.write({
        text: procedimento.codigoTabela,
        width: GeradorDePdf.field.width.LARGE_MIDDLE,
        align: 'left',
        fontSize: GeradorDePdf.field.fontSize.NORMAL,
        color: GeradorDePdf.field.COLOR,
        fontType: 'normal'
      })
      
      this.x += GeradorDePdf.field.width.LARGE_MIDDLE + GeradorDePdf.layout.GAP
      this.write({
        text: procedimento.codigo,
        width: GeradorDePdf.field.width.NORMAL,
        align: 'left',
        fontSize: GeradorDePdf.field.fontSize.NORMAL,
        color: GeradorDePdf.field.COLOR,
        fontType: 'normal'
      })
      
      this.x += GeradorDePdf.layout.ML + GeradorDePdf.field.width.NORMAL + GeradorDePdf.layout.GAP
      this.write({
        text: procedimento.nome.substring(0, 40),
        width: GeradorDePdf.field.width.VERY_LARGE,
        align: 'left',
        fontSize: GeradorDePdf.field.fontSize.NORMAL,
        color: GeradorDePdf.field.COLOR,
        fontType: 'normal'
      })
      
      this.x += GeradorDePdf.field.width.VERY_LARGE + GeradorDePdf.layout.GAP
      this.write({
        text: procedimento.qtdSolicitada,
        width: GeradorDePdf.field.width.NORMAL,
        align: 'left',
        fontSize: GeradorDePdf.field.fontSize.SHORT,
        color: GeradorDePdf.field.COLOR,
        fontType: 'normal'
      })
      
      this.x += GeradorDePdf.field.width.NORMAL + GeradorDePdf.layout.GAP
      this.write({
        text: procedimento.qtdAutorizada,
        width: GeradorDePdf.field.width.NORMAL,
        align: 'left',
        fontSize: GeradorDePdf.field.fontSize.SHORT,
        color: GeradorDePdf.field.COLOR,
        fontType: 'normal'
      })
    })

    this.y += (5 - this.guia.solicitacao.procedimentos.length-1) * (GeradorDePdf.section.HEIGHT + GeradorDePdf.layout.GAP)
    this.y += GeradorDePdf.section.HEIGHT + GeradorDePdf.layout.GAP
    this.x = 0
    this.section('Dados do Contratado Executante')
    
    this.y += GeradorDePdf.section.HEIGHT + GeradorDePdf.layout.GAP
    this.field({
      title: '30 - Código na Operadora / CPF / CNPJ',
      value: this.guia.contratadoExecutante.documentoExecutante,
      width: {
        value: GeradorDePdf.field.width.MIDDLE
      }
    })
    
    this.x += GeradorDePdf.field.width.MIDDLE + GeradorDePdf.layout.GAP
    this.field({
      title: '31 - Nome do Contratado',
      value: this.guia.contratadoExecutante.nome,
      width: {
        value: GeradorDePdf.field.width.VERY_LARGE
      }
    })
    
    this.x += GeradorDePdf.field.width.VERY_LARGE + GeradorDePdf.layout.GAP
    this.field({
      title: "32 - T.L.",
      value: this.guia.contratadoExecutante.endereco.tipoLogradouro,
      width: {
        value: GeradorDePdf.field.width.VERY_SHORT
      },
      background: GeradorDePdf.field.BACKGROUND
    })
    
    this.x += GeradorDePdf.field.width.VERY_SHORT + GeradorDePdf.layout.GAP
    this.field({
      title: '33-34-35-Logradouro - Número - Complemento',
      value: `${this.guia.contratadoExecutante.endereco.logradouro}, ${this.guia.contratadoExecutante.endereco.numero}. ${this.guia.contratadoExecutante.endereco.complemento}.`,
      width:{
        value: 180
      },
      fontSize: GeradorDePdf.field.fontSize.SHORT,
      background: GeradorDePdf.field.BACKGROUND
    })
    
    this.x += 180 + GeradorDePdf.layout.GAP
    this.field({
      title: '36 - Município',
      value: this.guia.contratadoExecutante.endereco.municipio,
      width: {
        value: 110
      },
      background: GeradorDePdf.field.BACKGROUND
    })

    this.x += 110 + GeradorDePdf.layout.GAP
    this.field({
      title: '37 - UF',
      value: this.guia.contratadoExecutante.endereco.uf,
      width:{
        value: GeradorDePdf.field.width.VERY_SHORT
      },
      background: GeradorDePdf.field.BACKGROUND
    })
    
    this.x += GeradorDePdf.field.width.VERY_SHORT + GeradorDePdf.layout.GAP
    this.field({
      title: '38 - Cód.IBGE',
      value: this.guia.contratadoExecutante.endereco.codigoIbgeMunicipio,
      width: {
        value: GeradorDePdf.field.width.SHORT
      },
      background: GeradorDePdf.field.BACKGROUND
    })
    
    this.x += GeradorDePdf.field.width.SHORT + GeradorDePdf.layout.GAP
    this.field({
      title: '39 - CEP',
      value: this.guia.contratadoExecutante.endereco.cep,
      width:{
        value: GeradorDePdf.field.width.SHORT
      },
      background: GeradorDePdf.field.BACKGROUND
    })

    this.x += GeradorDePdf.field.width.SHORT + GeradorDePdf.layout.GAP
    this.field({
      title: '40 - Código CNES',
      value: this.guia.contratadoExecutante.cnes,
      width: {
        value: 55
      },
      background: GeradorDePdf.field.BACKGROUND
    })

    this.y += GeradorDePdf.field.HEIGHT + GeradorDePdf.layout.GAP
    this.x = 0
    this.field({
      title: '40a - Código na Operadora / CPF do exec. complementar',
      value: this.guia.contratadoExecutante.documentoComplementar,
      width: {
        value: 160
      },
      background: GeradorDePdf.field.BACKGROUND
    })
    
    this.x += 160 + GeradorDePdf.layout.GAP
    this.field({
      title: "41 - Nome do Profissional Executante Complementar",
      value: this.guia.contratadoExecutante.nomeComplementar,
      width: {
        value: 300
      },
      
      background: GeradorDePdf.field.BACKGROUND
    })
    
    this.x += 300 + GeradorDePdf.layout.GAP
    this.field({
      title: "42 - Conselho Profissional",
      value: this.guia.contratadoExecutante.conselho,
      width: {
        value: GeradorDePdf.field.width.NORMAL
      },
      background: GeradorDePdf.field.BACKGROUND
    })
    
    this.x += GeradorDePdf.field.width.NORMAL + GeradorDePdf.layout.GAP
    this.field({
      title: '43 - Número no Conselho',
      value: this.guia.contratadoExecutante.conselhoNumero,
      width: {
        value: GeradorDePdf.field.width.NORMAL
      },
      background: GeradorDePdf.field.BACKGROUND
    })
    
    this.x += GeradorDePdf.field.width.NORMAL + GeradorDePdf.layout.GAP
    this.field({
      title: '44 - UF',
      value: this.guia.contratadoExecutante.conselhoUF,
      width: {
        value: GeradorDePdf.field.width.VERY_SHORT
      },
      background: GeradorDePdf.field.BACKGROUND
    })

    this.x += GeradorDePdf.field.width.VERY_SHORT + GeradorDePdf.layout.GAP
    this.field({
      title: '45 - Código CBO S',
      value: this.guia.contratadoExecutante.cbo,
      width:{
        value: GeradorDePdf.field.width.NORMAL
      },
      background: GeradorDePdf.field.BACKGROUND
    })

    this.x += GeradorDePdf.field.width.NORMAL + GeradorDePdf.layout.GAP
    this.field({
      title: '45a - Grau de Participação',
      value: this.guia.contratadoExecutante.grauParticipacao,
      width:{
        value: GeradorDePdf.field.width.NORMAL + 4
      },
      background: GeradorDePdf.field.BACKGROUND
    })

    this.y += GeradorDePdf.field.HEIGHT + GeradorDePdf.layout.GAP
    this.x = 0
    this.section('Dados do Atendimento')
    this.y += GeradorDePdf.section.HEIGHT + GeradorDePdf.layout.GAP
    this.field({
      title: '46 - Tipo Atendimento',
      value: this.guia.atendimento.tipoAtendimento,
      legend: '01 - Remoção  02 - Pequena Cirurgia  03 - Terapias  04 - Consulta  05 - Exame  06 - Atendimento Domiciliar  07 - SADT Internado  08 - Quimioterapia  09 - Radioterapia  10 - TRS - Terapia Renal Substitutiva',
      width:{
        value:350,
        legend: 80
      },
      background: GeradorDePdf.field.BACKGROUND,
      })

    this.x += 350 + GeradorDePdf.layout.GAP
    this.field({
      title: '47 - Indicação de Paciente',
      value: this.guia.atendimento.indicacaoAcidente,
      legend: '0 - Acidente ou doença relacionado ao trabalho  1 - Trânsito  2 - Outros',
      width:{
        value:245,
        legend: 80
      },
      background: GeradorDePdf.field.BACKGROUND,
      
  })
    
    this.x += 245 + GeradorDePdf.layout.GAP
    this.field({
      title: '48 - Tipo de Saîda',
      value: this.guia.atendimento.tipoSaida,
      width:{
        value: 222,
        legend: 80
      },
      legend:'1 - Retorno  2 - Retorno SADT  3 - Referência  4 - Internação  5 - Alta  6 - Óbito',
      
      background: GeradorDePdf.field.BACKGROUND
    })
    
    this.y += GeradorDePdf.field.HEIGHT + GeradorDePdf.layout.GAP
    this.x = 0
    this.section('Consulta Referência')

    this.y += GeradorDePdf.section.HEIGHT + GeradorDePdf.layout.GAP
    this.field({
      title: '49 - Tipo de Doença',
      value: this.guia.consultaReferencia?.tipoDoenca || "",
      legend: 'A - Aguda  C - Crônica',
      width:{
        legend: 65,
        value: 140
      },
      background: GeradorDePdf.field.BACKGROUND
    })

    this.x += 140 + GeradorDePdf.layout.GAP
    const anos = this.guia.consultaReferencia?.anosDoenca || ''
    const meses = this.guia.consultaReferencia?.mesesDoenca || ''
    const dias = this.guia.consultaReferencia?.diasDoenca || ''
    this.field({
      title: '50 - Tempo de Doença',
      value: `${anos} ${meses} ${dias}`,
      legend: 'A - Anos  M - Meses  D - Dias',
      width:{
        legend: 65,
        value: 160
      },
      background: GeradorDePdf.field.BACKGROUND
    })

    this.y += GeradorDePdf.field.HEIGHT + GeradorDePdf.layout.GAP
    this.section('Procedimentos e Exames Realizados')
    this.y += GeradorDePdf.section.HEIGHT + GeradorDePdf.layout.GAP
    this.x = 0

    this.rect({
      x: this.x + GeradorDePdf.layout.ML,
      y: this.y + GeradorDePdf.layout.MT,
      width: GeradorDePdf.field.width.NORMAL + GeradorDePdf.layout.GAP,
      height: 5 * (GeradorDePdf.section.HEIGHT + 2 * GeradorDePdf.layout.GAP)
    })

    this.rect({
      x: this.x + GeradorDePdf.field.width.NORMAL + GeradorDePdf.layout.GAP + GeradorDePdf.layout.ML,
      y: this.y + GeradorDePdf.layout.MT,
      width: 2 * (GeradorDePdf.field.width.VERY_SHORT + GeradorDePdf.layout.GAP),
      height: 5 * (GeradorDePdf.section.HEIGHT + 2 * GeradorDePdf.layout.GAP),
      background: GeradorDePdf.field.BACKGROUND 
    })

    this.rect({
      x: this.x + 2 * GeradorDePdf.field.width.VERY_SHORT + GeradorDePdf.field.width.NORMAL + 3 * GeradorDePdf.layout.GAP + GeradorDePdf.layout.ML,
      y: this.y + GeradorDePdf.layout.MT,
      width: 3 * GeradorDePdf.layout.GAP + GeradorDePdf.field.width.LARGE_MIDDLE + GeradorDePdf.field.width.NORMAL + GeradorDePdf.field.width.VERY_LARGE + GeradorDePdf.field.width.VERY_SHORT,
      height: 5 * (GeradorDePdf.section.HEIGHT + 2 * GeradorDePdf.layout.GAP)
    })

    this.rect({
      x: this.x + 6 * GeradorDePdf.layout.GAP + 2 * GeradorDePdf.field.width.NORMAL + 3 * GeradorDePdf.field.width.VERY_SHORT + GeradorDePdf.field.width.LARGE_MIDDLE + GeradorDePdf.field.width.VERY_LARGE + GeradorDePdf.layout.ML,
      y: this.y + GeradorDePdf.layout.MT,
      width: GeradorDePdf.layout.GAP + 2 * GeradorDePdf.field.width.VERY_SHORT + 40 + 2 * GeradorDePdf.field.width.SHORT + 10, 
      height: 5 * (GeradorDePdf.section.HEIGHT + 2 * GeradorDePdf.layout.GAP),
      background: GeradorDePdf.field.BACKGROUND
    })

    this.x = GeradorDePdf.layout.ML + GeradorDePdf.layout.GAP
    this.y += GeradorDePdf.layout.MT + GeradorDePdf.layout.GAP

    this.write({
      text: '51-Data',
      align: 'left',
      width: GeradorDePdf.field.width.NORMAL,
      color: GeradorDePdf.field.COLOR,
      fontType: 'negrito',
      fontSize: GeradorDePdf.field.fontSize.SHORT
    })

    this.x += GeradorDePdf.layout.GAP + GeradorDePdf.field.width.NORMAL
    this.write({
      text: '52-H.Ini.',
      width: GeradorDePdf.field.width.VERY_SHORT,
      align: 'left',
      fontSize: GeradorDePdf.field.fontSize.SHORT,
      color: GeradorDePdf.field.COLOR,
      fontType: 'negrito'
    })
    this.x += GeradorDePdf.field.width.VERY_SHORT + GeradorDePdf.layout.GAP
    this.write({
      text: '53-H.Fim',
      width: GeradorDePdf.field.width.VERY_SHORT,
      align: 'left',
      fontSize: GeradorDePdf.field.fontSize.SHORT,
      color: GeradorDePdf.field.COLOR,
      fontType: 'negrito'
    })
    this.x += GeradorDePdf.field.width.VERY_SHORT + GeradorDePdf.layout.GAP
    this.write({
      text: '54-Tabela',
      width: GeradorDePdf.field.width.LARGE_MIDDLE,
      align: 'left',
      fontSize: GeradorDePdf.field.fontSize.SHORT,
      color: GeradorDePdf.field.COLOR,
      fontType: 'negrito',
    })
    this.x += GeradorDePdf.field.width.LARGE_MIDDLE + GeradorDePdf.layout.GAP
    this.write({
      text: '55-Código Procedimento',
      width: GeradorDePdf.field.width.NORMAL,
      align: 'left',
      fontSize: GeradorDePdf.field.fontSize.SHORT,
      color: GeradorDePdf.field.COLOR,
      fontType: 'negrito'
    })
    this.x += GeradorDePdf.field.width.NORMAL + GeradorDePdf.layout.GAP
    this.write({
      text: '56-Descrição',
      width: GeradorDePdf.field.width.VERY_LARGE,
      align: 'left',
      fontSize: GeradorDePdf.field.fontSize.SHORT,
      color: GeradorDePdf.field.COLOR,
      fontType: 'negrito'
    })
    this.x += GeradorDePdf.field.width.VERY_LARGE + GeradorDePdf.layout.GAP
    this.write({
      text: '57-Qtde.',
      width: GeradorDePdf.field.width.VERY_SHORT,
      align: 'left',
      fontSize: GeradorDePdf.field.fontSize.SHORT,
      color: GeradorDePdf.field.COLOR,
      fontType: 'negrito'
    })
    this.x += GeradorDePdf.field.width.VERY_SHORT + GeradorDePdf.layout.GAP
    this.write({
      text: '58-Via',
      width: GeradorDePdf.field.width.VERY_SHORT,
      align: 'left',
      fontSize: GeradorDePdf.field.fontSize.SHORT,
      color: GeradorDePdf.field.COLOR,
      fontType: 'negrito'
    })
    this.x += GeradorDePdf.field.width.VERY_SHORT + GeradorDePdf.layout.GAP
    this.write({
      text: '58-Tec.',
      width: GeradorDePdf.field.width.VERY_SHORT,
      align:'left',
      fontSize: GeradorDePdf.field.fontSize.SHORT,
      color: GeradorDePdf.field.COLOR,
      fontType: 'negrito'
    })
    this.x += GeradorDePdf.field.width.VERY_SHORT + GeradorDePdf.layout.GAP
    this.write({
      text: '60% Red./Acresc.',
      width: 50,
      align: 'left',
      fontSize: GeradorDePdf.field.fontSize.SHORT,
      color: GeradorDePdf.field.COLOR,
      fontType: 'negrito'
    })
    this.x += 50 + GeradorDePdf.layout.GAP
    this.write({
      text: '61-V.Unit R$',
      width: GeradorDePdf.field.width.SHORT,
      align: 'left',
      fontSize: GeradorDePdf.field.fontSize.SHORT,
      color: GeradorDePdf.field.COLOR,
      fontType: 'negrito'
    })
    this.x += GeradorDePdf.field.width.SHORT + GeradorDePdf.layout.GAP
    this.write({
      text: '62-V.Total R$',
      width: GeradorDePdf.field.width.SHORT,
      align: 'left',
      fontSize: GeradorDePdf.field.fontSize.SHORT,
      color: GeradorDePdf.field.COLOR,
      fontType: 'negrito'
    })

    this.guia.procedimentosRealizados.procedimentos.forEach(procedimento => {
      this.y += GeradorDePdf.section.HEIGHT + GeradorDePdf.layout.GAP
      this.x = GeradorDePdf.layout.ML + GeradorDePdf.layout.GAP
      this.write({
        text: '',
        y: this.y - 2,
        width: GeradorDePdf.field.width.NORMAL,
        align: 'left',
        fontSize: GeradorDePdf.field.fontSize.NORMAL,
        color: GeradorDePdf.field.COLOR,
        fontType: 'normal'
      })

      this.x += GeradorDePdf.field.width.NORMAL + GeradorDePdf.layout.GAP
      this.write({
        text: procedimento.horaInicial,
        width: GeradorDePdf.field.width.VERY_SHORT,
        align: 'left',
        fontSize: GeradorDePdf.field.fontSize.NORMAL,
        color: GeradorDePdf.field.COLOR,
        fontType: 'normal'
      })

      this.x += GeradorDePdf.field.width.VERY_SHORT + GeradorDePdf.layout.GAP
      this.write({
        text: procedimento.horaFinal,
        width: GeradorDePdf.field.width.VERY_SHORT,
        align: 'left',
        fontSize: GeradorDePdf.field.fontSize.NORMAL,
        color: GeradorDePdf.field.COLOR,
        fontType: 'normal'
      })

      this.x += GeradorDePdf.field.width.VERY_SHORT + GeradorDePdf.layout.GAP
      this.write({
        text: procedimento.codigoTabela,
        align: 'left',
        fontSize: GeradorDePdf.field.fontSize.NORMAL,
        width: GeradorDePdf.field.width.LARGE_MIDDLE,
        color: GeradorDePdf.field.COLOR,
        fontType: 'normal'
      })

      this.x += GeradorDePdf.field.width.LARGE_MIDDLE + GeradorDePdf.layout.GAP
      this.write({
        text: procedimento.codigo,
        width: GeradorDePdf.field.width.NORMAL,
        align: 'left',
        fontSize: GeradorDePdf.field.fontSize.NORMAL,
        color: GeradorDePdf.field.COLOR,
        fontType: 'normal'
      })
      
      this.x += GeradorDePdf.field.width.NORMAL + GeradorDePdf.layout.GAP
      this.write({
        text: procedimento.nome.substring(0, 40),
        width: GeradorDePdf.field.width.VERY_LARGE,
        align: 'left',
        fontSize: GeradorDePdf.field.fontSize.NORMAL,
        color: GeradorDePdf.field.COLOR,
        fontType: 'normal'
      })
        
      this.x += GeradorDePdf.field.width.VERY_LARGE + GeradorDePdf.layout.GAP
      this.write({
        text: procedimento.qtdRealizada,
        width: GeradorDePdf.field.width.VERY_SHORT,
        align: 'left',
        fontSize: GeradorDePdf.field.fontSize.NORMAL,
        color: GeradorDePdf.field.COLOR,
        fontType: 'normal'
      })
      
      this.x += GeradorDePdf.field.width.VERY_SHORT + GeradorDePdf.layout.GAP
      this.write({
        text: procedimento.viaAcesso,
        width: GeradorDePdf.field.width.VERY_SHORT,
        align: 'left',
        fontSize: GeradorDePdf.field.fontSize.NORMAL,
        color: GeradorDePdf.field.COLOR,
        fontType: 'normal'
      })
      
      this.x += GeradorDePdf.field.width.VERY_SHORT + GeradorDePdf.layout.GAP
      this.write({
        text: procedimento. tecnica,
        width: GeradorDePdf.field.width.VERY_SHORT,
        align: 'left',
        fontSize: GeradorDePdf.field.fontSize.NORMAL,
        color: GeradorDePdf.field.COLOR,
        fontType: 'normal',
      })
      
      this.x += GeradorDePdf.field.width.VERY_SHORT + GeradorDePdf.layout.GAP
      this.write({
        text: procedimento.reducaoAcrescimoPct,
        align: "left",
        fontSize: GeradorDePdf.field.fontSize.NORMAL,
        width: 50,
        color: GeradorDePdf.field.COLOR,
        fontType: 'normal',
      })
      
      this.x += 50 + GeradorDePdf.layout.GAP
      this.write({
        text: '',
        width: GeradorDePdf.field.width.SHORT,
        align: 'left',
        fontSize: GeradorDePdf.field.fontSize.NORMAL,
        color: GeradorDePdf.field.COLOR,
        fontType: 'normal',
      })
      
      this.x += GeradorDePdf.field.width.SHORT + GeradorDePdf.layout.GAP
      this.write({
        text: "",
        width: GeradorDePdf.field.width.SHORT,
        align: 'left',
        fontSize: GeradorDePdf.field.fontSize.NORMAL,
        color: GeradorDePdf.field.COLOR,
        fontType: 'normal',
      })
    })

    this.y += (5 - this.guia.procedimentosRealizados.procedimentos.length) * (GeradorDePdf.section.HEIGHT + GeradorDePdf.layout.GAP)
    this.x = 0

    let largura = 158
    let altura = 10

    this.rect({
      width: 5 * (largura + 3 * GeradorDePdf.layout.GAP),
      height:  2 * (altura + 3 * GeradorDePdf.layout.GAP),
      background: GeradorDePdf.field.BACKGROUND
    })

    this.x += GeradorDePdf.layout.ML + GeradorDePdf.layout.GAP
    this.y += GeradorDePdf.layout.MT + GeradorDePdf.layout.GAP
    this.write({
      text: '63 - Data e Assinatura de Procedimentos em Série',
      width: largura,
      align: 'left',
      color: GeradorDePdf.field.COLOR,
      fontType: 'negrito',
      fontSize: GeradorDePdf.field.fontSize.SHORT
    })

    this.y += altura
    this.write({
      text: '1 -   |____|____|____|   ________________________________',
      width: largura,
      align: "left",
      color: GeradorDePdf.field.COLOR,
      fontType: 'normal',
      fontSize: GeradorDePdf.field.fontSize.SHORT
    })

    this.x += largura + GeradorDePdf.layout.GAP
    this.write({
    text: '3 -   |____|____|____|   ________________________________ ',
    width: largura,
    align: 'left',
    color: GeradorDePdf.field.COLOR,
    fontType: 'normal',
    fontSize: GeradorDePdf.field.fontSize.SHORT
    })

    this.x += largura + GeradorDePdf.layout.GAP
    this.write({
      text: '5 -   |____|____|____|   ________________________________ ',
      width: largura,
      align: 'left',
      color: GeradorDePdf.field.COLOR,
      fontType: 'normal',
      fontSize: GeradorDePdf.field.fontSize.SHORT
    })
    this.x += largura + GeradorDePdf.layout.GAP
    this.write({
      text: '7 -   |____|____|____|   ________________________________ ',
      width: largura,
      align: 'left',
      color: GeradorDePdf.field.COLOR,
      fontType: 'normal',
      fontSize: GeradorDePdf.field.fontSize.SHORT
    })
    this.x += largura + GeradorDePdf.layout.GAP
    this.write({
      text: '9 -   |____|____|____|   ________________________________ ',
      width: largura,
      align: 'left',
      color: GeradorDePdf.field.COLOR,
      fontType: 'normal',
      fontSize: GeradorDePdf.field.fontSize.SHORT
    })

    this.y += altura
    this.x = GeradorDePdf.layout.ML + GeradorDePdf.layout.GAP
    this.write({
      text: '2 -   |____|____|____|   ________________________________ ',
      width: largura,
      align :'left',
      color: GeradorDePdf.field.COLOR,
      fontType: 'normal',
      fontSize: GeradorDePdf.field.fontSize.SHORT
    })
    this.x += largura + GeradorDePdf.layout.GAP
    this.write({
      text: '4 -   |____|____|____|   ________________________________ ',
      width: largura,
      align :'left',
      color: GeradorDePdf.field.COLOR,
      fontType: 'normal',
      fontSize: GeradorDePdf.field.fontSize.SHORT
    })
    this.x += largura + GeradorDePdf.layout.GAP
    this.write({
      text: '6 -   |____|____|____|   ________________________________ ',
      width: largura,
      align :'left',
      color: GeradorDePdf.field.COLOR,
      fontType: 'normal',
      fontSize: GeradorDePdf.field.fontSize.SHORT
    })
    this.x += largura + GeradorDePdf.layout.GAP
    this.write({
      text: '8 -   |____|____|____|   ________________________________ ',
      width: largura,
      align :'left',
      color: GeradorDePdf.field.COLOR,
      fontType: 'normal',
      fontSize: GeradorDePdf.field.fontSize.SHORT
    })
    this.x += largura + GeradorDePdf.layout.GAP
    this.write({
      text: '10 -  |____|____|____|   ________________________________ ',
      width: largura,
      align :'left',
      color: GeradorDePdf.field.COLOR,
      fontType: 'normal',
      fontSize: GeradorDePdf.field.fontSize.SHORT
    })

    this.y += GeradorDePdf.layout.GAP
    this.x = 0

    this.rect({
      width: 5 * (largura + 3 * GeradorDePdf.layout.GAP),
      height: 2 * (altura + 3 * GeradorDePdf.layout.GAP),
      background: GeradorDePdf.field.BACKGROUND
    })

    this.x += GeradorDePdf.layout.ML + GeradorDePdf.layout.GAP
    this.y += altura
    
    this.write({
      text: '64 - Observação',
      width: largura,
      align: 'left',
      color: GeradorDePdf.field.COLOR,
      fontType: 'negrito',
      fontSize: GeradorDePdf.field.fontSize.SHORT
    })

    this.y += altura
    this.write({
      text: this.guia.procedimentosRealizados.observacao,
      width: 5 * (largura + 3 * GeradorDePdf.layout.GAP),
      align: 'left',
      color: GeradorDePdf.field.COLOR,
      fontType: 'normal',
      fontSize: GeradorDePdf.field.fontSize.NORMAL
    })

    largura = (GeradorDePdf.layout.WIDTH - GeradorDePdf.layout.ML - GeradorDePdf.layout.MR - (7 * GeradorDePdf.layout.GAP)) / 7

    this.x = 0
    this.y += GeradorDePdf.field.HEIGHT + GeradorDePdf.layout.GAP - altura
    this.field({
      title: '65 - Total Procedimentos R$',
      value: this.guia.procedimentosRealizados.totalProcedimentos,
      width: {
        value: largura,
      },
      background: GeradorDePdf.field.BACKGROUND
    })
    
    this.x += largura + GeradorDePdf.layout.GAP
    this.field({
      title: '66 - Total Taxas e Aluguéis R$',
      value: this.guia.procedimentosRealizados.totalTaxasAlugueis,
      width: {
        value: largura,
      },
      background: GeradorDePdf.field.BACKGROUND
    })
    
    this.x += largura + GeradorDePdf.layout.GAP
    this.field({
      title: '67 - Total Materiais R$',
      value: this.guia.procedimentosRealizados.totalMateriais,
      width: {
        value: largura,
      },
      background: GeradorDePdf.field.BACKGROUND
    })
    
    this.x += largura + GeradorDePdf.layout.GAP
    this.field({
      title: '68 - Total Medicamentos R$',
      value: this.guia.procedimentosRealizados.totalMedicamentos,
      width: {
        value: largura,
      },
      background: GeradorDePdf.field.BACKGROUND
    })

    this.x += largura + GeradorDePdf.layout.GAP
    this.field({
      title: '69 - Total Diárias R$',
      value: this.guia.procedimentosRealizados.totalDiarias,
      width: {
        value: largura,
      },
      background: GeradorDePdf.field.BACKGROUND
    })

    this.x += largura + GeradorDePdf.layout.GAP
    this.field({
      title: '70 - Total Gases Medicinais R$',
      value: this.guia.procedimentosRealizados.totalGases,
      width: {
        value: largura,
      },
      background: GeradorDePdf.field.BACKGROUND
    })

    this.x += largura + GeradorDePdf.layout.GAP
    this.field({
      title: '71 - Total Geral da Guia R$',
      value: this.guia.procedimentosRealizados.totalGuia,
      width: {
        value: largura,
      },
      background: GeradorDePdf.field.BACKGROUND
    })

    this.x += largura + GeradorDePdf.layout.GAP
    largura = (GeradorDePdf.layout.WIDTH - GeradorDePdf.layout.ML - GeradorDePdf.layout.MR - (4 * GeradorDePdf.layout.GAP)) / 4
    this.y += GeradorDePdf.field.HEIGHT + GeradorDePdf.layout.GAP
    this.x = 0
    this.field({
      title: '86 - Data e Assinatura do Solicitante',
      value: '|____| / |____| / |____|  _______________________________',
      width: {
        value: largura,
      },
      background: GeradorDePdf.field.BACKGROUND
    })

    this.x += largura + GeradorDePdf.layout.GAP
    this.field({
      title: '87 - Data e Assinatura do Responsável pela Autorização',
      value: '|____| / |____| / |____|  _______________________________',
      width: {
        value: largura,
      },
      background: GeradorDePdf.field.BACKGROUND
    })
    
    this.x += largura + GeradorDePdf.layout.GAP
    this.field({
      title: '88 - Data e Assinatura do Beneficiario ou Responsável',
      value: '|____| / |____| / |____|  _____________________________',
      width: {
        value: largura,
      },
      background: GeradorDePdf.field.BACKGROUND
    })
    
    this.x += largura + GeradorDePdf.layout.GAP
    this.field({
      title: '86 - Data e Assinatura do Prestador Executante',
      value: '|____| / |____| / |____|  _____________________________',
      width: { 
        value: largura
      },
      background: GeradorDePdf.field.BACKGROUND
    })

    this.x += largura + GeradorDePdf.layout.GAP
    const paginas = this.pdf.bufferedPageRange()

    for (let i = paginas.start; i < paginas.start + paginas.count; i++) {
      this.pdf.switchToPage(i)
    }

    this.pdf.flushPages()
    this.pdf.end()
    return this.pdf
  }

  section(title: string) {
    this.rect({
      x: GeradorDePdf.layout.ML,
      width: GeradorDePdf.layout.WIDTH - 20,
      height: GeradorDePdf.section.HEIGHT,
      background: GeradorDePdf.field.BACKGROUND
    })
    this.write({
      text: title,
      align: 'left',
      fontSize: GeradorDePdf.field.fontSize.SHORT,
      width: GeradorDePdf.layout.WIDTH - 20,
      y: GeradorDePdf.layout.MT + this.y + 1,
      x: GeradorDePdf.layout.ML + 2,
      color: GeradorDePdf.title.COLOR,
      fontType: 'negrito'
    })
  }

  rect({ background, width, height, x, y }: IRectProps) {
    this.pdf
      .rect(
        x || GeradorDePdf.layout.ML + this.x,
        y || GeradorDePdf.layout.MT + this.y,
        width || GeradorDePdf.layout.WIDTH,
        height || GeradorDePdf.field.HEIGHT
      )
      .fillAndStroke(background || "#fff", '#121213')
  }

  field ({ legend, title, background, value, width, fontSize }: IFieldProps) {
    this.rect({ width: width?.value, background })
    this.write({
      text: title,
      x: GeradorDePdf.layout.ML + this.x + GeradorDePdf.layout.GAP,
      y: GeradorDePdf.layout.MT + this.y + GeradorDePdf.layout.GAP,
      align: 'left',
      fontSize: fontSize || GeradorDePdf.field.fontSize.SHORT,
      width: width?.title || width?.value || 80,
      color: GeradorDePdf.field.COLOR,
      fontType: 'negrito'
    })
    this.write({
      text: value || "",
      x: GeradorDePdf.layout.ML + this.x,
      y: GeradorDePdf.layout.MT + this.y + 12,
      width: (width?.value || GeradorDePdf.field.width.SHORT) - GeradorDePdf.layout.GAP,
      fontSize: GeradorDePdf.field.fontSize.NORMAL,
      align: 'right',
      color: GeradorDePdf.field.COLOR,
      fontType: 'normal'
    })

    if (legend && width?.legend) {
      this.write({
        text: legend,
        x: GeradorDePdf.layout.ML + this.x + width.legend,
        y: GeradorDePdf.layout.MT + this.y + GeradorDePdf.layout.GAP,
        width: ((width?.value || GeradorDePdf.field.width.SHORT) - GeradorDePdf.layout.GAP) - GeradorDePdf.layout.GAP - width.legend,
        fontSize: GeradorDePdf.field.fontSize.SHORT,
        align: 'left',
        color: GeradorDePdf.field.COLOR,
        fontType: 'normal'
      })
    }
  }

  write({ text, fontType, fontSize, color, width, align, x, y, lineGap }: IWrite){
    this.pdf
      .font(fontType || 'negrito')
      .fillColor(color || GeradorDePdf.title.COLOR)
      .fontSize(fontSize || GeradorDePdf.field.fontSize.NORMAL)
      .text(text || '', x || this.x, y || this.y, {
        width: width || GeradorDePdf.field.width.NORMAL,
        align: align || 'center',
        lineGap: lineGap || 0
      })
  }

  logotipo() {
    const logotipo = this.guia.beneficiario.convenio.logotipo
    if (logotipo) {
      this.pdf.image(logotipo, this.x, 0, { fit: [GeradorDePdf.field.width.NORMAL, GeradorDePdf.field.width.NORMAL], cover: [GeradorDePdf.field.width.NORMAL, GeradorDePdf.field.width.NORMAL] })
      return
    } 

    this.write({
      text: this.guia.beneficiario.convenio.nome,
      align: 'center',
      fontSize: GeradorDePdf.field.fontSize.NORMAL,
      color: GeradorDePdf.title.COLOR,
      width: GeradorDePdf.field.width.NORMAL,
      fontType: 'negrito',
      x: this.x + GeradorDePdf.layout.ML,
      y: this.y + GeradorDePdf.layout.MT,
    })
    return 
  }
}

export default GeradorDePdf
