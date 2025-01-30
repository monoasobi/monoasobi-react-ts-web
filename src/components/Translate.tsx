import yoasobi from "@assets/yoasobi.jpg";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import styled from "styled-components";

const Container = styled(Flex)`
  width: 100%;
  padding: 24px;
  height: calc(100dvh - 56px);
  overflow: auto;

  .card {
    overflow: visible;
  }

  .yoasobi {
    width: 100%;
    max-width: 360px;
  }
`;

export const Translate = () => {
  return (
    <Container direction="column">
      <Card className="card">
        <Flex direction="column" align="center" gap="4">
          <img className="yoasobi" src={yoasobi} alt="yoasobi" />
          <Heading>번역본 없음</Heading>
          <Text size="2">해당 작품의 한글 번역본이 존재하지 않습니다.</Text>

          <Flex direction="column" gap="4" className="desc">
            <Text size="2">
              번역본 기여하기 :{" "}
              <a href="mailto:envi.9.offcial@gmail.com?subject=모노아소비 번역본 기여 문의">
                envi.9.offcial@gmail.com
              </a>
            </Text>
          </Flex>
        </Flex>
      </Card>
    </Container>
  );
};
