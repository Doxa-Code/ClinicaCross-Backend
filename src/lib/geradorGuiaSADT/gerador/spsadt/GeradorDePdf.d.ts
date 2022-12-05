export interface IOpcoes {
  autor: string
  titulo: string
  criador: string
  layout: "landscape" | "portrait" | undefined
  creditos: string
  produzidoPor: string
  stream?: any
}

export type ALIGN = 'left' | 'center' | 'right'
export type FONT_TYPE = 'normal' | 'negrito' | 'italico'

export interface IWrite {
  text: string 
  fontType: FONT_TYPE 
  fontSize: number 
  color: string 
  width: number 
  align: ALIGN
  x?: number
  y?: number
  lineGap?: number
}

export interface ILayout {
  MT: number
  ML: number
  MR: number
  GAP: number
  WIDTH: number
  HEIGHT: number
}

export interface IField {
  LINE_WIDTH: number
  HEIGHT: number
  width: {
    NORMAL: number
    VERY_SHORT: number
    SHORT: number
    MIDDLE: number
    LARGE: number
    LARGE_MIDDLE: number
    VERY_LARGE: number
    ABSTRACT: {
      nome: number
      indicacao: number
    }
  }
  ALIGN: ALIGN
  COLOR: string
  BACKGROUND: string
  fontSize: {
    NORMAL: number
    SHORT: number
    ABSTRACT: {
      numeroGuia: number
    }
  }
}

export interface ISection {
  HEIGHT: number
  FONT_SIZE: number
  COLOR: string
}

export interface ITitle {
  WIDTH: number
  FONT_SIZE: number
  COLOR: string
  ALIGN: ALIGN
}
export interface IFieldProps {
  title: string, 
  value?: string, 
  fontSize?: number,
  width?: {
    title?: number
    value?: number
    legend?: number
  },
  background?: string,
  legend?: string
}

export interface IRectProps {
  background?: string,
  width?: number,
  height?:number,
  x?:number,
  y?: number
}

export interface IValueProps {
  value: string, 
  width: number, 
  align: ALIGN, 
  fontSize: number
}