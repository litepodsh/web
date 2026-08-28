"use client";

import { RootProvider } from "fumadocs-ui/provider/next";
import type { RootProviderProps } from "fumadocs-ui/provider/next";

export function Providers(props: RootProviderProps) {
  return (
    <RootProvider
      {...props}
      theme={{
        ...props.theme,
        scriptProps:
          typeof window === "undefined" ? undefined : ({ type: "application/json" } as const),
      }}
    >
      {props.children}
    </RootProvider>
  );
}
