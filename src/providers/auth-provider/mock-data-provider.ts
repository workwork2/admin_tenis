// src/providers/mock-data-provider.ts
"use client";

import { DataProvider } from "@refinedev/core";
import { IUser, IClub, ITournament } from "@/interfaces";

let mockUsers: IUser[] =[
    { id: 8493021, firstName: "Андрей", lastName: "Волков", middleName: "Иванович", email: "volkov@example.com", city: "Ярославль", rating: 180, preferences: { hand: "Правая", side: "Правый", gameType: "Турниры" } },
    { id: 8493022, firstName: "Иван", lastName: "Иванов", email: "ivan@test.ru", city: "Москва", rating: 120, preferences: { hand: "Левая", side: "Левый", gameType: "Оба" } }
];

let mockClubs: IClub[] =[
    {
        id: 1, name: "Клубный клуб", address: "Москва, ул. Лужники, 24", workingHours: "07:00 - 23:00", phone: "+7 (999) 123-45-67", email: "info@padelclub.ru", status: "approved",
        ownerName: "Игорь Владельцев",
        logo: "https://i.pravatar.cc/150?img=11",
        managers:[
            { id: 101, name: "Алексей Смирнов", role: "Менеджер" },
            { id: 102, name: "Мария Иванова", role: "Админ" }
        ]
    }
];

let mockTournaments: ITournament[] =[
    {
        id: 1, clubId: 1, title: "Weekend Padel Cup", type: "Любители", format: "Олимпийский формат", level: "<300", maxPlayers: 32, fee: 2500,
        startDate: "2024-06-15", startTime: "10:00", endDate: "2024-06-16", endTime: "20:00", status: "active", coverImage: "https://i.pravatar.cc/300?img=15",
        participantIds: [8493021, 8493022] // ДОБАВИЛИ УЧАСТНИКОВ В ТУРНИР
    },
    {
        id: 2, clubId: 1, title: "Winter Grand Slam", type: "PRO", format: "Круговой формат", level: "Open", maxPlayers: 16, fee: 5000,
        startDate: "2024-12-01", startTime: "09:00", endDate: "2024-12-02", endTime: "18:00", status: "inactive",
        participantIds:[]
    }
];

export const mockDataProvider: DataProvider = {
    getList: async ({ resource, filters }) => {
        let data: any[] =[];
        if (resource === "users") data = mockUsers;
        if (resource === "clubs") data = mockClubs;
        if (resource === "tournaments") data = mockTournaments;

        if (filters && filters.length > 0) {
            filters.forEach((filter: any) => {
                data = data.filter(item => item[filter.field]?.toString() === filter.value.toString());
            });
        }
        return { data, total: data.length };
    },
    getOne: async ({ resource, id }) => {
        const data = resource === "users" ? mockUsers : resource === "clubs" ? mockClubs : mockTournaments;
        const item = data.find((i: any) => i.id.toString() === id.toString());
        return { data: item as any };
    },
    update: async ({ resource, id, variables }) => {
        if (resource === "users") mockUsers = mockUsers.map(u => u.id.toString() === id.toString() ? { ...u, ...(variables as any) } : u);
        else if (resource === "clubs") mockClubs = mockClubs.map(c => c.id.toString() === id.toString() ? { ...c, ...(variables as any) } : c);
        else if (resource === "tournaments") mockTournaments = mockTournaments.map(t => t.id.toString() === id.toString() ? { ...t, ...(variables as any) } : t);
        return { data: variables as any };
    },
    create: async ({ resource, variables }) => {
        const newObj = { ...(variables as any), id: Math.floor(Math.random() * 1000000) };
        if (resource === "users") mockUsers.push(newObj);
        if (resource === "clubs") mockClubs.push({ ...newObj, status: 'pending' });
        if (resource === "tournaments") mockTournaments.push({ ...newObj, status: 'active' });
        return { data: newObj as any };
    },
    deleteOne: async ({ resource, id }) => {
        if (resource === "users") mockUsers = mockUsers.filter(u => u.id.toString() !== id.toString());
        if (resource === "clubs") mockClubs = mockClubs.filter(c => c.id.toString() !== id.toString());
        if (resource === "tournaments") mockTournaments = mockTournaments.filter(t => t.id.toString() !== id.toString());
        return { data: { id } as any };
    },
    getApiUrl: () => "",
};