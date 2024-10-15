"use client";
import { Container } from "@mantine/core"; 
import Todo from "@/components/Todo";
import AddTask from "@/components/AddTask";
import EditTask from "@/components/EditTask";
import dynamic from "next/dynamic";
import MSWProvider from "./msw-provider"; 
import "@mantine/core/styles.css";
import { Routes, Route } from "react-router-dom";

export default async function Home() {
  const ClientOnlyBrowserRouter = dynamic(() =>
    import("react-router-dom").then((mod) => mod.BrowserRouter),
    { ssr: false }
  );

  return (
    <MSWProvider>
      <Container>
        <ClientOnlyBrowserRouter>
          <Routes>
            <Route path="/" element={<Todo />} />
            <Route path="/tasks/new" element={<AddTask />} />
            <Route path="/tasks/:id/edit" element={<EditTask />} />
          </Routes>
        </ClientOnlyBrowserRouter>
      </Container>
    </MSWProvider>
  );
}
