import { Music } from "@appTypes/music";
import yoasobi from "@assets/yoasobi.jpg";
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

  .yoasobi {
    width: 100%;
    max-width: 360px;
  }
`;

interface TranslateProps {
  music: Music;
}

export const Translate = ({ music }: TranslateProps) => {
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
            {music.originalNovelUrl && (
              <Button size="1" asChild variant="outline">
                <Link to={music.originalNovelUrl} target="_blank">
                  원문 보러가기
                </Link>
              </Button>
            )}
          </Flex>
        </Flex>
      </Card>
    </Container>
  );
};
