import logo from "@assets/logo.svg";
import { appearanceAtom } from "@atoms/appearance.atom";
import { sidebarAtom } from "@atoms/sidebar.atom";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { Flex, IconButton, Tooltip } from "@radix-ui/themes";
import { useRecoilState, useSetRecoilState } from "recoil";

import styled from "styled-components";

const Container = styled(Flex)`
  width: 100%;
  padding: 0 16px;
  height: 56px;
  background-color: var(--gray-1);

  .logo {
    width: 120px;
  }
`;

export const Header = () => {
  const [appearance, setAppearance] = useRecoilState(appearanceAtom);
  const setIsSidebar = useSetRecoilState(sidebarAtom);
  const darkmodeHandler = () => {
    setAppearance((prev) => (prev === "light" ? "dark" : "light"));
  };
  const sidebarHAndler = () => {
    setIsSidebar((prev) => !prev);
  };
  return (
    <Container justify="between" align="center">
      <IconButton onClick={sidebarHAndler} variant="ghost">
        <Bars3Icon width={24} />
      </IconButton>
      <img src={logo} alt="logo" className="logo" />
      <Tooltip content="Change Theme">
        <IconButton onClick={darkmodeHandler} variant="ghost">
          {appearance === "light" ? (
            <SunIcon width={24} />
          ) : (
            <MoonIcon width={24} />
          )}
        </IconButton>
      </Tooltip>
    </Container>
  );
};
