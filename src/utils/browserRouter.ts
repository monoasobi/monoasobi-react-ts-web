import { Layout } from "@components/layout/Layout";
import { Home } from "@pages/Home.page";
import { NotFound } from "@pages/NotFound.page";
import { Novel } from "@pages/Novel.page";
import { OnTheStageContents } from "@pages/OnTheStageContents.page";
import { createBrowserRouter } from "react-router-dom";

export const appRouter = createBrowserRouter([
  {
    Component: Layout,
    children: [
      { path: "/", Component: Home },
      { path: "/onthestage/:id", Component: OnTheStageContents },
      { path: ":novelId", Component: Novel },
      { path: "/404", Component: NotFound },
      { path: "/*", Component: NotFound },
    ],
  },
]);
