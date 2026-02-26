// src/providers/auth-provider/auth-provider.client.ts
"use client";
import { AuthProvider } from "@refinedev/core";

export const authProvider: AuthProvider = {
  login: async () => ({ success: true, redirectTo: "/" }),
  register: async (params) => {
    // Имитация успешной регистрации администратора
    console.log("Регистрация успешна:", params);
    return { success: true, redirectTo: "/" }; 
  },
  logout: async () => ({ success: true, redirectTo: "/login" }),
  check: async () => ({ authenticated: true }), // Для тестов всегда пускаем
  onError: async (error) => ({ error }),
  getPermissions: async () => null,
  getIdentity: async () => ({
    id: 1,
    name: "Админ Проекта",
    avatar: "https://i.pravatar.cc/300",
  }),
};