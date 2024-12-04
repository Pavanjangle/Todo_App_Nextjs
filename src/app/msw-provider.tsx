"use client";
import { MantineProvider } from "@mantine/core";
import { Suspense, use } from "react";

const mockingEnabledPromise =
  typeof window !== "undefined"
    ? import("../mocks/browser").then(async ({ worker }) => {
        await worker.start({
          onUnhandledRequest(request) {

            if  (request && request.url.includes("_next")) 
              
              {
              return;
            }
          },
        });
      })
    : Promise.resolve();

export function MSWProvider({ children }: { children: React.ReactNode }) {
  // If MSW is enabled, we need to wait for the worker to start.         
  // so we wrap the children in a Suspense boundary until it's ready.
  return (
    <Suspense fallback={null}>
      <MSWProviderWrapper>{children}</MSWProviderWrapper>
    </Suspense>
  );
}

function MSWProviderWrapper({ children }: { children: React.ReactNode }) {
  use(mockingEnabledPromise);

  return (
    <MantineProvider>
      {children}
    </MantineProvider>
  );
}
