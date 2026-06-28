import logo from "@assets/logo.svg";
import { appearanceAtom } from "@atoms/appearance.atom";
import { fontAtom } from "@atoms/font.atom";
import { sidebarAtom } from "@atoms/sidebar.atom";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { Bars3Icon } from "@heroicons/react/24/solid";
import {
  Button,
  Flex,
  IconButton,
  Popover,
  SegmentedControl,
  Text,
} from "@radix-ui/themes";
import { MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";

import styled from "styled-components";

const Container = styled(Flex)`
  width: 100%;
  padding: 10px 16px;
  height: 56px;
  background-color: var(--gray-1);

  .logo {
    width: 120px;
  }
`;

const ButtonText = styled(Text)<{ $font?: "gothic" | "batang" }>`
  font-weight: 700;
  font-family: ${({ $font }) =>
    $font === "batang" ? '"KoPub Batang"' : '"Pretendard JP Variable"'};
`;

export const Header = () => {
  const [appearance, setAppearance] = useRecoilState(appearanceAtom);
  const [font, setFont] = useRecoilState(fontAtom);
  const setIsSidebar = useSetRecoilState(sidebarAtom);

  const sidebarHAndler: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    setIsSidebar((prev) => !prev);
  };

  return (
    <Container justify="between" align="center">
      <IconButton onClick={sidebarHAndler} variant="ghost">
        <Bars3Icon width={24} />
      </IconButton>
      <Link to="/">
        <Button asChild variant="ghost">
          <img src={logo} alt="logo" className="logo" />
        </Button>
      </Link>
      <Popover.Root>
        <Popover.Trigger>
          <IconButton variant="ghost">
            <Cog6ToothIcon width={24} />
          </IconButton>
        </Popover.Trigger>
        <Popover.Content align="end">
          <Flex direction="column" gap="3">
            <Flex direction="column" gap="2">
              <Text size="1" weight="bold" color="gray">
                테마
              </Text>
              <SegmentedControl.Root
                variant="classic"
                value={appearance}
                onValueChange={(v) => setAppearance(v as "light" | "dark")}
                size="1"
              >
                <SegmentedControl.Item value="light">
                  <ButtonText>라이트</ButtonText>
                </SegmentedControl.Item>
                <SegmentedControl.Item value="dark">
                  <ButtonText>다크</ButtonText>
                </SegmentedControl.Item>
              </SegmentedControl.Root>
            </Flex>
            <Flex direction="column" gap="2">
              <Text size="1" weight="bold" color="gray">
                폰트
              </Text>
              <SegmentedControl.Root
                value={font}
                onValueChange={(v) => setFont(v as "gothic" | "batang")}
                size="1"
              >
                <SegmentedControl.Item value="gothic">
                  <ButtonText>Pretendard</ButtonText>
                </SegmentedControl.Item>
                <SegmentedControl.Item className="batang" value="batang">
                  <ButtonText $font="batang">Kopub 바탕</ButtonText>
                </SegmentedControl.Item>
              </SegmentedControl.Root>
            </Flex>
          </Flex>
        </Popover.Content>
      </Popover.Root>
    </Container>
  );
};
