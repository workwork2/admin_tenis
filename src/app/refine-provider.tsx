// src/app/refine-provider.tsx
"use client";

import React, { Suspense } from "react"; // <-- 1. ДОБАВЬТЕ ИМПОРТ Suspense
import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { useNotificationProvider } from "@refinedev/antd";
import routerProvider from "@refinedev/nextjs-router";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "@refinedev/antd/dist/reset.css";

import { authProvider } from "@/providers/auth-provider/auth-provider.client";
import { ColorModeContextProvider } from "@/contexts/color-mode";
import { mockDataProvider } from "@providers/auth-provider/mock-data-provider";

export default function RefineProvider({ children }: { children: React.ReactNode }) {
  return (
    <RefineKbarProvider>
      <AntdRegistry>
        <ColorModeContextProvider>
          <Refine
            routerProvider={routerProvider}
            dataProvider={mockDataProvider}
            authProvider={authProvider}
            notificationProvider={useNotificationProvider}
            resources={[
              {
                name: "users",
                list: "/users",
                create: "/users/create",
                edit: "/users/edit/:id",
                show: "/users/show/:id",
                meta: { label: "Участники", icon: "👤" },
              },
              {
                name: "clubs",
                list: "/clubs",
                create: "/clubs/create",
                edit: "/clubs/edit/:id",
                show: "/clubs/show/:id",
                meta: { label: "Клубы (Заявки)", icon: "🏟️" },
              },
              {
                 name: "tournaments",
                 list: "/tournaments",
                 create: "/tournaments/create",
                 edit: "/tournaments/edit/:id",
                 meta: { label: "Турниры", icon: "🏆" },
              },
            ]}
            options={{ syncWithLocation: true, warnWhenUnsavedChanges: true }}
          >
            {children}
            {/* 2. ОБЕРНИТЕ RefineKbar В Suspense */}
            <Suspense fallback={null}>
              <RefineKbar />
            </Suspense>
          </Refine>
        </ColorModeContextProvider>
      </AntdRegistry>
    </RefineKbarProvider>
  );
}