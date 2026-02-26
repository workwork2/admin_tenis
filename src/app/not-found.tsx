// src/app/not-found.tsx
"use client";

import { ErrorComponent } from "@refinedev/antd";
import { Authenticated } from "@refinedev/core";
import { Suspense } from "react";

export default function NotFound() {
  return (
    // ДОБАВЬТЕ fallback={null} СЮДА:
    <Suspense fallback={null}>
      <Authenticated key="not-found">
        <ErrorComponent />
      </Authenticated>
    </Suspense>
  );
}