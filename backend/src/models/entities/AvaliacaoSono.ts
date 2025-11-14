import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";
import { Medico } from "./Medico";
import { QuestionarioSono } from "./QuestionarioSono";

@Entity("AVALIACOES_SONO")
export class AvaliacaoSono {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        type: "tinyint",
        nullable: false
    })
    resultado: number;

    @Column({
        type: "text",
        nullable: true
    })
    recomendacao: string;

    @CreateDateColumn({
        name: "data",
        type: "timestamp"
    })
    data: Date;

    @Column({ name: "medico_id", type: "varchar", length: 36 })
    medicoId: string;

    @ManyToOne(() => Medico, medico => medico.avaliacoesSono)
    @JoinColumn({ name: "medico_id" })
    medico: Medico;

    @Column({ 
        name: "questionario_sono_id", 
        type: "varchar", 
        length: 36,
        unique: true 
    })
    questionarioSonoId: string;

    @OneToOne(() => QuestionarioSono, questionario => questionario.avaliacao)
    @JoinColumn({ name: "questionario_sono_id" })
    questionarioSono: QuestionarioSono;

    @UpdateDateColumn({
        name: "updated_at",
        type: "timestamp"
    })
    updatedAt: Date;
}