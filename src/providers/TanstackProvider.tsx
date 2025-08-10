import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";

const queryClient = new QueryClient();

const TanstackProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default TanstackProvider;
