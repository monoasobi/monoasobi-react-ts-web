import yoasobi from "@assets/yoasobi.jpg";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import styled from "styled-components";

const Container = styled(Flex)`
  width: 100%;
  height: calc(100dvh - 56px);
  overflow: auto;
  line-height: 160%;
  padding: 24px;

  .card {
    padding: 16px;
  }

  .yoasobi {
    width: 100%;
    max-width: 360px;
  }

  .desc {
    width: 90%;
    max-width: 480px;
  }
`;

export const Home = () => {
  return (
    <Container direction="column">
      <Card className="card">
        <Flex direction="column" align="center" gap="4">
          <img className="yoasobi" src={yoasobi} alt="yoasobi" />
          <Heading size="6">Novel into Music</Heading>
          <Heading size="4" color="red">
            MONOASOBI
          </Heading>
          <Flex direction="column" gap="4" className="desc">
            <Text size="2">
              모노아소비는 요아소비 음악의 소설 원작 번역본을 수집한
              사이트입니다.
            </Text>
            <Text size="2">
              제공되는 모든 소설 원작과 번역본은 작가 / 번역자에게 저작권이
              있으며, 모노아소비는 이 사이트를 통해 영리적인 취득을 하지
              않습니다.
            </Text>
            <Text size="2">
              번역 및 기타 문의 :{" "}
              <a href="mailto:envi.9.offcial@gmail.com?subject=모노아소비 문의">
                envi.9.offcial@gmail.com
              </a>
            </Text>
          </Flex>
        </Flex>
      </Card>
    </Container>
  );
};
