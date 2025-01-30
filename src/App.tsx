import { appearanceAtom } from "@atoms/appearance.atom";
import { sidebarAtom } from "@atoms/sidebar.atom";
import { Theme } from "@radix-ui/themes";
import { appRouter } from "@utils/browserRouter";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

export const App = () => {
  const appearance = useRecoilValue(appearanceAtom);
  const setIsSidebar = useSetRecoilState(sidebarAtom);
  useEffect(() => {
    const width = window.innerWidth;
    if (width < 1024) setIsSidebar(false);
  }, []);
  return (
    <Theme
      appearance={appearance}
      accentColor="red"
      panelBackground="solid"
      radius="small"
    >
      <RouterProvider router={appRouter} />
    </Theme>
  );
};
