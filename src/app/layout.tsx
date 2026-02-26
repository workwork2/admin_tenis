// src/app/layout.tsx
import React, { Suspense } from "react"; // 1. ДОБАВЛЕН ИМПОРТ Suspense
import RefineProvider from "./refine-provider";

export const metadata = {
  title: "Padel Club Admin",
  description: "Админ-панель для управления клубами и игроками",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        {/* 2. ОБОРАЧИВАЕМ RefineProvider В Suspense */}
        <Suspense fallback={null}>
          <RefineProvider>
            {children}
          </RefineProvider>
        </Suspense>
      </body>
    </html>
  );
}