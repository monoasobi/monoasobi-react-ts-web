import heartbeat from "@assets/1000heartbeat.png";
import fes from "@assets/18fes.jpg";
import { Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled(Flex)`
  width: 100%;
  padding: 24px;
  max-width: 1024px;
  height: calc(100dvh - 116px);
  overflow: auto;

  .card {
    overflow: visible;
  }

  .subtitle {
    font-style: italic;
  }

  .img {
    width: 100%;
    max-width: 360px;
  }

  .desc {
    width: 90%;
  }
`;

export const HeartBeat = () => {
  return (
    <Container direction="column">
      <Card className="card">
        <Flex direction="column" align="center" gap="4">
          <img className="img" src={fes} alt="fes" />
          <img className="img" src={heartbeat} alt="heartbeat" />
          <Heading size="6">2023 NHK 18祭</Heading>

          <Flex direction="column" gap="4" className="desc">
            <Text size="2">
              18세의 마음을 담아 만든 신곡을 1,000명의 18세들과 함께 단 한 번의
              무대에서 선보이는 NHK 18祭(18FES).
            </Text>
            <Text size="2">
              이 축제에서는 아티스트가 18세를 살아가는 이들의 다양한 생각과
              감정을 듣고, 이를 바탕으로 신곡을 제작합니다. 그리고 그 곡을
              1,000명의 18세 세대와 함께 단 한 번뿐인 특별한 공연으로
              완성합니다.
            </Text>
            <Text size="2">
              2023 NHK 18祭(18FES) 에서는 YOASOBI가 함께했습니다. 메세지와
              문장은 물론 노래, 연주, 춤, 스포츠 등 다양한 방식으로 전해진
              18세를 살아가는 이들의 마음이 원작이 되어 「HEART BEAT」가
              탄생하였습니다.
            </Text>

            <Button asChild variant="outline">
              <Link
                to="https://www.nhk.or.jp/18fes/shinon1000/movie/song/"
                target="_blank"
              >
                원문 보러가기
              </Link>
            </Button>
          </Flex>
        </Flex>
      </Card>
    </Container>
  );
};
