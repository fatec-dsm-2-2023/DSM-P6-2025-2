import { AppDataSource } from "../../config/database";
import { AvaliacaoSono } from "../entities/AvaliacaoSono";
import { IAvaliacaoSono, IAvaliacaoSonoCreate } from "../interfaces/IAvaliacaoSono";
import { Medico } from "../entities/Medico";
import { QuestionarioSono } from "../entities/QuestionarioSono";

export class AvaliacaoSonoRepository {
    private repository = AppDataSource.getRepository(AvaliacaoSono);

    async create(avaliacaoData: IAvaliacaoSonoCreate): Promise<AvaliacaoSono> {
        const avaliacao = new AvaliacaoSono();
        avaliacao.resultado = avaliacaoData.resultado;
        avaliacao.recomendacao = avaliacaoData.recomendacao || "";

        // Configurar relações
        const medico = new Medico();
        medico.id = avaliacaoData.medicoId;
        avaliacao.medico = medico;
        avaliacao.medicoId = avaliacaoData.medicoId;

        const questionarioSono = new QuestionarioSono();
        questionarioSono.id = avaliacaoData.questionarioSonoId;
        avaliacao.questionarioSono = questionarioSono;
        avaliacao.questionarioSonoId = avaliacaoData.questionarioSonoId;

        return await this.repository.save(avaliacao);
    }

    async save(avaliacao: AvaliacaoSono): Promise<AvaliacaoSono> {
        return await this.repository.save(avaliacao);
    }

    async findByMedicoId(medicoId: string): Promise<AvaliacaoSono[]> {
        return await this.repository.find({
            where: { medicoId },
            relations: ["questionarioSono", "medico"],
            order: { data: "DESC" },
        });
    }

    async findById(id: string): Promise<AvaliacaoSono | null> {
        return await this.repository.findOne({
            where: { id },
            relations: ["medico", "questionarioSono"],
        });
    }

    async findByQuestionarioSonoId(questionarioSonoId: string): Promise<AvaliacaoSono | null> {
        return await this.repository.findOne({
            where: { questionarioSonoId },
            relations: ["medico", "questionarioSono"],
        });
    }

    async update(id: string, avaliacaoData: Partial<IAvaliacaoSono>): Promise<AvaliacaoSono | null> {
        await this.repository.update(id, avaliacaoData);
        return await this.findById(id);
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected !== 0;
    }

    async findAll(): Promise<AvaliacaoSono[]> {
        return await this.repository.find({
            relations: ["medico", "questionarioSono"],
            order: { data: "DESC" },
        });
    }

    async findByPacienteId(pacienteId: string): Promise<AvaliacaoSono[]> {
        return await this.repository
            .createQueryBuilder("avaliacao")
            .leftJoinAndSelect("avaliacao.questionarioSono", "questionario")
            .leftJoinAndSelect("avaliacao.medico", "medico")
            .where("questionario.pacienteId = :pacienteId", { pacienteId })
            .orderBy("avaliacao.data", "DESC")
            .getMany();
    }
}