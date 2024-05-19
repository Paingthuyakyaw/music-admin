import React from "react";
import ReactDOM from "react-dom/client";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "./style/index.css";
import { MantineProvider } from "@mantine/core";
import Router from "./router.tsx";
import { theme } from "./style/theme.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Notifications } from "@mantine/notifications";
import "@mantine/core/styles.layer.css";
import "mantine-datatable/styles.layer.css";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider defaultColorScheme="light" theme={theme}>
      <QueryClientProvider client={client}>
        <Router />
        <Notifications position="bottom-right" />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </MantineProvider>
  </React.StrictMode>
);
