import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import ArchiveArticle from "./pages/ArchiveArticle";
import ArchiveManager from "./admin/ArchiveManager";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: '/archives/:archiveLink',
    element: <ArchiveArticle />
  },
  {
    path: '/admin/archives',
    element: <ArchiveManager />
  },
]);
export default function App() {
  return <RouterProvider router={router} />;
}
