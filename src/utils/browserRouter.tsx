import { Home } from "@pages/Home.page";
import { createBrowserRouter } from "react-router-dom";

export const appRouter = createBrowserRouter([
  { path: "/", element: <Home /> },
]);
