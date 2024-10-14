"use client";
import { Container } from "@mantine/core"; // Import Mantine Container
import Todo from "@/components/Todo";
import AddTask from "@/components/AddTask";
import * as ReactDOM from "react-dom/client";
import '@mantine/core/styles.css';
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import EditTask from "@/components/EditTask";
import dynamic from 'next/dynamic';

export default async function Home() {

  const ClientOnlyBrowserRouter = dynamic(() =>
    import('react-router-dom').then(mod => mod.BrowserRouter),
    { ssr: false }
  );

  return (
    <Container>
      <ClientOnlyBrowserRouter>
        <Routes>
          <Route path="/" element={<Todo />}>
          </Route>
          <Route path="/tasks/new" element={<AddTask />} />

          <Route path="/tasks/:id/edit" element={<EditTask />} />
        </Routes>
      </ClientOnlyBrowserRouter>
    </Container>

  );
}
