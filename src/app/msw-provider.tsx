"use client";

import { MantineProvider } from "@mantine/core";
import { Suspense, use } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";


const queryClient = new QueryClient();
const mockingEnabledPromise =
  typeof window !== "undefined"
    ? import("../mocks/browser").then(async ({ worker }) => {
        await worker.start({
          onUnhandledRequest(request, print) {
            if (request.url.includes("_next")) 
              
              {
              return;
            }
            print.warning();
          },
        });
      })
    : Promise.resolve();

    export default function MSWProvider({ children }: { children: ReactNode }) {
      return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
    }

function MSWProviderWrapper({ children }: { children: React.ReactNode }) {
  use(mockingEnabledPromise);

  return (
    <MantineProvider
      
    >
      {children}
    </MantineProvider>
  );
}