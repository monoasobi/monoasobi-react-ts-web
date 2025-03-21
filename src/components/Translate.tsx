import { Music } from "@appTypes/music";
import yoasobi from "@assets/yoasobi.jpg";
import { novels } from "@lib/novel";
import { Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled(Flex)`
  width: 100%;
  padding: 92px 24px 24px;
  max-width: 1024px;
  height: calc(100dvh - 72px);
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
  const novel = novels.find((novel) => novel.musicId === music.id);
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
              <a href="mailto:envi.9.official@gmail.com?subject=모노아소비 번역본 기여 문의">
                envi.9.official@gmail.com
              </a>
            </Text>
            {novel?.originUrl && (
              <Button size="1" asChild variant="outline">
                <Link to={novel?.originUrl} target="_blank">
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
