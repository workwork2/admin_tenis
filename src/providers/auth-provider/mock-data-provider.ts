"use client";

import { DataProvider } from "@refinedev/core";
import { IUser, IClub, ITournament } from "@/interfaces";

let mockUsers: IUser[] =[
    { id: 8493021, firstName: "Андрей", lastName: "Волков", middleName: "Иванович", email: "volkov@example.com", city: "Ярославль", rating: 299, status: 'active', preferences: { hand: "Правая", side: "Правый", gameType: "Турниры" } },
    { id: 8493022, firstName: "Леонид", lastName: "Левин", middleName: "М.", email: "levin@test.ru", city: "Москва", rating: 270, status: 'active', preferences: { hand: "Левая", side: "Левый", gameType: "Оба" } },
    { id: 8493023, firstName: "Сергей", lastName: "Павлов", middleName: "Т.", email: "pavlov@padel.ru", city: "Санкт-Петербург", rating: 268, status: 'active', preferences: { hand: "Правая", side: "Левый", gameType: "Турниры" } }
];

let mockClubs: IClub[] =[
    { id: 1, name: "Клубный клуб", address: "ул. Лужники, 24", city: "Москва", workingHours: "07:00 - 23:00", phone: "+7 (999) 123-45-67", email: "info@padelclub.ru", status: "approved", ownerName: "Игорь Владельцев", logo: "https://i.pravatar.cc/150?img=11", managers:[{ id: 101, name: "Алексей Смирнов", role: "Менеджер" }, { id: 102, name: "Мария Иванова", role: "Админ" }] },
    { id: 2, name: "Новый Падел Арена", address: "Невский пр-т, 1", city: "Санкт-Петербург", workingHours: "10:00 - 22:00", email: "newarena@padel.ru", status: "pending", managers:[] }
];

let mockTournaments: ITournament[] =[
    { id: 1, clubId: 1, title: "Padel Weekend Cup", type: "Любители", format: "Олимпийский формат", level: "< 300", maxPlayers: 32, fee: 4500, startDate: "2024-05-12", startTime: "18:00", endDate: "2024-05-13", endTime: "22:00", status: "active", participantIds:[8493021, 8493022, 8493023], waitlistIds: [8493024] }
];

export const mockDataProvider: DataProvider = {
    getList: async ({ resource, filters }) => {
        let data: any[] =[];
        if (resource === "users") data = mockUsers;
        if (resource === "clubs") data = mockClubs;
        if (resource === "tournaments") data = mockTournaments;
        return { data, total: data.length };
    },
    getOne: async ({ resource, id }) => {
        const data = resource === "users" ? mockUsers : resource === "clubs" ? mockClubs : mockTournaments;
        const item = data.find((i: any) => i.id.toString() === id.toString());
        return { data: item as any };
    },
    update: async ({ resource, id, variables }) => { return { data: variables as any }; },
    create: async ({ resource, variables }) => { return { data: variables as any }; },
    deleteOne: async ({ id }) => { return { data: { id } as any }; },
    getApiUrl: () => "",
};