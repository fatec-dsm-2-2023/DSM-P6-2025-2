export interface IAvaliacaoSono {
    id?: string;
    data: Date;
    resultado: number;
    recomendacao?: string;
    medicoId: string;
    questionarioSonoId: string;
}

export interface IAvaliacaoSonoCreate {
    resultado: number;
    recomendacao?: string;
    medicoId: string;
    questionarioSonoId: string;
}

export interface IAvaliacaoSonoResponse {
    id: string;
    data: Date;
    resultado: number;
    recomendacao?: string;
    medicoId: string;
    questionarioSonoId: string;
    medico?: {
        id: string;
        nome: string;
    };
    questionarioSono?: {
        id: string;
        pacienteId: string;
    };
}