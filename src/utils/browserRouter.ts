import { Layout } from "@components/layout/Layout";
import { Comic } from "@pages/Comic.page";
import { Home } from "@pages/Home.page";
import { Novel } from "@pages/Novel.page";
import { createBrowserRouter } from "react-router-dom";

export const appRouter = createBrowserRouter([
  {
    Component: Layout,
    children: [
      { path: "/", Component: Home },
      { path: "/comics/:comicId", Component: Comic },
      { path: ":novelId", Component: Novel },
    ],
  },
]);
