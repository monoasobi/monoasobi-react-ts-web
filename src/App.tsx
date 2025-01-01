import { appearanceAtom } from "@atoms/appearance.atom";
import { Theme } from "@radix-ui/themes";
import { appRouter } from "@utils/browserRouter";
import { RouterProvider } from "react-router-dom";
import { useRecoilValue } from "recoil";

export const App = () => {
  const appearance = useRecoilValue(appearanceAtom);

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
