import { Header } from "@components/layout/Header";
import { MusicList } from "@components/MusicList";
import styled from "styled-components";

const Container = styled.div`
  width: 100dvw;
  min-height: 100dvh;
`;

export const Home = () => {
  return (
    <Container>
      <Header />
      <MusicList />
    </Container>
  );
};
