import { sidebarAtom } from "@atoms/sidebar.atom";
import { Header } from "@components/layout/Header";
import { MusicList } from "@components/MusicList";
import { Flex } from "@radix-ui/themes";
import { Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

const Container = styled(Flex)`
  width: 100dvw;
  height: 100dvh;
`;

export const Layout = () => {
  const isSidebar = useRecoilValue(sidebarAtom);
  return (
    <Container direction="column">
      <Header />
      <Flex flexGrow="1">
        {isSidebar && <MusicList />}
        <Flex flexGrow="1">
          <Outlet />
        </Flex>
      </Flex>
    </Container>
  );
};
