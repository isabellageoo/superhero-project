export interface EstatisticasPoder {
    inteligencia: string;
    forca: string;
    velocidade: string;
    durabilidade: string;
    poder: string;
    combate: string;
}

export interface Biografia {
    'nomeCompleto': string;
    'alterEgo': string;
    apelidos: string[];
    'localDeNascimento': string;
    'primeiraAparicao': string;
    editora: string;
    alinhamento: string;
}

export interface Imagem {
    url: string;
}

export interface HeroiExterno {
    id: number;
    nome: string;
    estatisticasPoder: EstatisticasPoder;
    biografia: Biografia;
    imagem: Imagem;
}

export interface HeroiFavorito {
    _id: string;
    heroiId: number;
    nome: string;
    estatisticasPoder: EstatisticasPoder;
    biografia: Biografia;
    imagem: Imagem;
    notas: string;
    eFavorito: boolean;
    criadoEm: string;
    atualizadoEm: string;
}