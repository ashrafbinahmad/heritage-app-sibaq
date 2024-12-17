import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import ArchiveArticle from "./pages/ArchiveArticle";
import ArchiveManager from "./admin/ArchiveManager";
import SpecialDays from "./admin/SpecialDaysManager";
import HalalHotels from "./admin/HalalHotelsManager";

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
  {
    path: '/admin/specialdays',
    element: <SpecialDays />
  },
  {
    path: '/admin/halalhotels',
    element: <HalalHotels />
  },
]);
export default function App() {
  return <RouterProvider router={router} />;
}
