export interface IQuestionarioSono {
    id?: string;
    gender: number;
    age: number;
    occupation: string;
    sleepDuration: number;
    qualityOfSleep: number;
    physicalActivityLevel: number;
    stressLevel: number;
    bmiCategory: string;
    bloodPressure: string;
    heartRate: number;
    dailySteps: number;
    sleepDisorder?: string;
    pacienteId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IQuestionarioSonoCreate {
    gender: number;
    age: number;
    occupation: string;
    sleepDuration: number;
    qualityOfSleep: number;
    physicalActivityLevel: number;
    stressLevel: number;
    bmiCategory: string;
    bloodPressure: string;
    heartRate: number;
    dailySteps: number;
    pacienteId: string;
}