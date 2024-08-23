import { ReactNode } from "react";

export interface Local {
    local: string;
    n_local: number;
    email: string;
    contacto: string;
    celular: number;
    linea: number | null;
    ubicacion: string;
    categoria: string;
    rubro: string;
    rubroSecundario: string;
    horarios: string;
    logoLocal: string;
    fotoLocal: string;
    instagram: string;
    facebook: string;
    web?: string;
    texto?: string;
}

  export interface CardProps {
    product: {
      local: string;
      n_local: number;
      email: string;
      contacto: string;
      celular: number;
      linea: number | null;
      ubicacion: string;
      categoria: string;
      rubro: string;
      rubroSecundario: string;
      horarios: string;
      logoLocal: string;
      fotoLocal: string;
      instagram: string;
      facebook: string;
      web?: string;
      texto?: string;
    };
}

export interface LoadingProps {
    ancho?: string;
}

export interface DataCarrusel {
    imgSrc: string;
}

export interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
}

export interface DrawerProps {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}


export interface ButtonWspProps {
  text?: string;
  contact?: string;
}

export interface Sociales {
  instagram?: string,
  facebook?: string,
  contact?: number,
  linea?: number,
  email?: string,
  web?: string,
  handleShare: () => void,
  showShareButton:boolean
}