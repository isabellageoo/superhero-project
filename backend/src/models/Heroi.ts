import mongoose, { Schema, Document } from 'mongoose';

export interface IHeroi extends Document {
    heroiId: number;
    nome: string;

    estatisticasDePoder: {
        inteligencia: string;
        forca: string;
        velocidade: string;
        durabilidade: string;
        poder: string;
        combate: string;
    };

    biografia: {
        'nomeCompleto': string;
        'alterEgo': string;
        apelidos: string[];
        'localDeNascimento': string;
        'primeiraAparicao': string;
        editora: string;
        alinhamento: string;
    };

    imagem: {
        url: string;
    };

    eFavorito: boolean;
    notas?: string;
    criadoEm: Date;
    atualizadoEm: Date;
}

const HeroiSchema: Schema = new Schema({
    heroiId: {
        type: Number,
        resquired: true,
        unique: true
    },

    nome: {
        type: String,
        resquired: true
    },

    estatisticasDePoder: {
        inteligencia: String,
        forca: String,
        velocidade: String,
        durabilidade: String,
        poder: String,
        combate: String
    },

    biografia: {
        'nomeCompleto': String,
        'alterEgo': String,
        apelidos: [String],
        'localDeNascimento': String,
        'primeiraAparicao': String,
        editora: String,
        alinhamento: String
    },

    imagem: {
        url: String
    },

    eFavorito: {
        type: Boolean,
        default: ''
    },

    notas: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

HeroiSchema.methods.salvar = async function (): Promise<IHeroi> {
    return await this.save();
};

const Heroi = mongoose.model<IHeroi>('Heroi', HeroiSchema);
export default Heroi;