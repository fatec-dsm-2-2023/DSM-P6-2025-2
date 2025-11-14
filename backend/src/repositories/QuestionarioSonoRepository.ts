import { AppDataSource } from "../../config/database";
import { QuestionarioSono } from "../entities/QuestionarioSono";
import { IQuestionarioSono, IQuestionarioSonoCreate } from "../interfaces/IQuestionarioSono";

export class QuestionarioSonoRepository {
    private repository = AppDataSource.getRepository(QuestionarioSono);

    async create(questionarioData: IQuestionarioSonoCreate): Promise<QuestionarioSono> {
        const questionario = new QuestionarioSono();
        
        questionario.gender = questionarioData.gender;
        questionario.age = questionarioData.age;
        questionario.occupation = questionarioData.occupation;
        questionario.sleepDuration = questionarioData.sleepDuration;
        questionario.qualityOfSleep = questionarioData.qualityOfSleep;
        questionario.physicalActivityLevel = questionarioData.physicalActivityLevel;
        questionario.stressLevel = questionarioData.stressLevel;
        questionario.bmiCategory = questionarioData.bmiCategory;
        questionario.bloodPressure = questionarioData.bloodPressure;
        questionario.heartRate = questionarioData.heartRate;
        questionario.dailySteps = questionarioData.dailySteps;
        questionario.pacienteId = questionarioData.pacienteId;

        return await this.repository.save(questionario);
    }

    async findById(id: string): Promise<QuestionarioSono | null> {
        return await this.repository.findOne({
            where: { id },
            relations: ["paciente", "avaliacao"]
        });
    }

    async findByPacienteId(pacienteId: string): Promise<QuestionarioSono[]> {
        return await this.repository.find({
            where: { pacienteId },
            relations: ["avaliacao"],
            order: { createdAt: "DESC" }
        });
    }

    async findAll(): Promise<QuestionarioSono[]> {
        return await this.repository.find({
            relations: ["paciente", "avaliacao"],
            order: { createdAt: "DESC" }
        });
    }

    async update(id: string, questionarioData: Partial<IQuestionarioSono>): Promise<QuestionarioSono | null> {
        await this.repository.update(id, questionarioData);
        return await this.findById(id);
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected !== 0;
    }
}