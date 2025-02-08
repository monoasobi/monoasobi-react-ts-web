import { Layout } from "@components/layout/Layout";
import { NotFound } from "@pages/NotFound.page";
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
const OnTheStageContents = lazy(() =>
  import("@pages/OnTheStageContents.page").then(({ OnTheStageContents }) => ({
    default: OnTheStageContents,
  }))
);

export const appRouter = createBrowserRouter([
  {
    Component: Layout,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/onthestage/:id", element: <OnTheStageContents /> },
      { path: ":novelId", element: <Novel /> },
      { path: "/404", element: <NotFound /> },
      { path: "/*", element: <NotFound /> },
    ],
  },
]);
