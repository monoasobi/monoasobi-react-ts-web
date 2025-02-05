import onthestage1 from "@assets/onthestage1.png";
import onthestage2 from "@assets/onthestage2.png";
import onthestage3 from "@assets/onthestage3.png";

import { Button, Card, Flex, Separator, Text } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled(Flex)`
  width: 100%;
  max-width: 1024px;
  padding: 92px 24px 24px;
  height: calc(100dvh - 72px);
  overflow: auto;

  .card {
    padding: 24px;
    overflow: visible;
  }
  .imgs {
    max-width: 100%;
    > img {
      max-width: 30%;
    }
  }
`;

export const OnTheStage = () => {
  return (
    <Container direction="column">
      <Card className="card">
        <Flex direction="column" align="center" gap="4">
          <Flex gap="3" justify="center" className="imgs">
            <img src={onthestage1} alt="onthestage1" />
            <img src={onthestage2} alt="onthestage2" />
            <img src={onthestage3} alt="onthestage3" />
          </Flex>

          <Flex direction="column" gap="4" className="desc">
            <Text size="2">
              「舞台に立って(무대에 서서)」는 소설이 아닌 소년 점프+ 와의 「NHK
              스포츠 테마 2024」 콜라보레이션 단편 코믹스를 원작으로 하며, 원작
              만화를 토대로 한 소설 역시 공개되어 있습니다.
            </Text>

            <Card variant="surface">
              <Flex gap="3" direction="column" width="100%" align="center">
                <Flex direction="column" gap="2" align="center">
                  <Text size="3" weight="medium">
                    헤어진 두 사람
                  </Text>
                  <Flex gap="2" flexGrow="1" flexBasis="1">
                    <Button size="1" asChild variant="outline">
                      <Link to="/comics/1">코믹스 (번역본)</Link>
                    </Button>
                    <Button size="1" asChild variant="outline">
                      <Link
                        to="https://www.yoasobi-music.jp/novels/hanaretafutari/"
                        target="_blank"
                      >
                        소설 (원문)
                      </Link>
                    </Button>
                  </Flex>
                </Flex>
                <Separator size="3" />
                <Flex direction="column" gap="2" align="center">
                  <Text size="3" weight="medium">
                    Parallel Lane
                  </Text>
                  <Flex gap="2" flexGrow="1" flexBasis="1">
                    <Button size="1" asChild variant="outline">
                      <Link to="/comics/2">코믹스 (번역본)</Link>
                    </Button>
                    <Button size="1" asChild variant="outline">
                      <Link
                        to="https://www.yoasobi-music.jp/novels/parallel-lane/"
                        target="_blank"
                      >
                        소설 (원문)
                      </Link>
                    </Button>
                  </Flex>
                </Flex>
                <Separator size="3" />
                <Flex direction="column" gap="2" align="center">
                  <Text size="3" weight="medium">
                    끝나지 않는 듀스
                  </Text>
                  <Flex gap="2" flexGrow="1" flexBasis="1">
                    <Button size="1" asChild variant="outline">
                      <Link to="/comics/3">코믹스 (번역본)</Link>
                    </Button>
                    <Button size="1" asChild variant="outline">
                      <Link
                        to="https://www.yoasobi-music.jp/novels/owaranai-deuce/"
                        target="_blank"
                      >
                        소설 (원문)
                      </Link>
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
            </Card>
            <Text size="2" align="center">
              번역본 기여하기 :{" "}
              <a href="mailto:envi.9.official@gmail.com?subject=모노아소비 번역본 기여 문의">
                envi.9.official@gmail.com
              </a>
            </Text>
          </Flex>
        </Flex>
      </Card>
    </Container>
  );
};
