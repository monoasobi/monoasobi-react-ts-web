import { Layout } from "@components/layout/Layout";
import { HeartBeat } from "@pages/HeartBeat.page";
import { NotFound } from "@pages/NotFound.page";
import { OnTheStage } from "@pages/OnTheStage.page";
import { Players } from "@pages/Players.page";
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const Home = lazy(() =>
  import("@pages/Home.page").then(({ Home }) => ({
    default: Home,
  }))
);
const Novel = lazy(() =>
  import("@pages/Novel.page").then(({ Novel }) => ({
    default: Novel,
  }))
);
const Comic = lazy(() =>
  import("@pages/Comic.page").then(({ Comic: Comic }) => ({
    default: Comic,
  }))
);

export const appRouter = createBrowserRouter([
  {
    Component: Layout,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/comic/:id", element: <Comic /> },
      { path: "/novel/:id", element: <Novel /> },
      { path: "/onthestage", element: <OnTheStage /> },
      { path: "/heartbeat", element: <HeartBeat /> },
      { path: "/players", element: <Players /> },
      { path: "/404", element: <NotFound /> },
      { path: "/*", element: <NotFound /> },
    ],
  },
]);
