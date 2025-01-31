import { Flex } from "@radix-ui/themes";
import { OrbitProgress } from "react-loading-indicators";
import styled from "styled-components";

const Container = styled(Flex)`
  width: 100%;
  min-height: 100%;
  padding: 16px;
`;

export const Loading = () => {
  return (
    <Container justify="center" align="center">
      <OrbitProgress color="#e3004e" size="large" />
    </Container>
  );
};
