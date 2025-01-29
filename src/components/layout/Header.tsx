import { appearanceAtom } from "@atoms/appearance.atom";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { Flex, IconButton, Tooltip } from "@radix-ui/themes";
import { useRecoilState } from "recoil";
import styled from "styled-components";

const Container = styled(Flex)`
  width: 100%;
  padding: 16px;
  height: 56px;
  background-color: var(--gray-1);
`;

export const Header = () => {
  const [appearance, setAppearence] = useRecoilState(appearanceAtom);
  const changeHandler = () => {
    setAppearence((prev) => (prev === "light" ? "dark" : "light"));
  };
  return (
    <Container justify="between" align="center">
      <div className="logo">MONOASOBI</div>
      <Tooltip content="Change Theme">
        <IconButton onClick={changeHandler} variant="ghost">
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
