import { Layout } from "@components/layout/Layout";
import { Home } from "@pages/Home.page";
import { Novel } from "@pages/Novel.page";
import { createBrowserRouter } from "react-router-dom";

export const appRouter = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", Component: Home },
      { path: ":novelId", Component: Novel },
    ],
  },
]);
