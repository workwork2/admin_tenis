// src/interfaces/index.ts

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    middleName?: string;
    email: string;
    city?: string;
    rating?: number;
    preferences?: {
        hand: 'Левая' | 'Правая' | 'Обе';
        side: 'Левый' | 'Правый' | 'Оба';
        gameType: 'Друж.' | 'Турниры' | 'Оба';
    };
}

export interface IManager {
    id: number;
    name: string;
    role: string;
}

export interface IClub {
    id: number;
    name: string;
    address: string;
    workingHours: string;
    website?: string;
    email: string;
    phone?: string;
    description?: string;
    status: 'pending' | 'approved' | 'rejected';
    logo?: string;
    ownerName?: string;
    managers?: IManager[];
}

export interface ITournament {
    id: number;
    clubId: number;
    title: string;
    type: string;
    format: 'Олимпийский формат' | 'Круговой формат' | 'Группы + Плей-офф' | 'Мексикано' | 'Американо';
    level: string;
    maxPlayers: number;
    fee: number;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    description?: string;
    coverImage?: string;
    status: 'active' | 'inactive';
    participantIds?: number[]; // НОВОЕ ПОЛЕ: Массив ID участников
}