import onthestage1 from "@assets/onthestage1.png";
import onthestage2 from "@assets/onthestage2.png";
import onthestage3 from "@assets/onthestage3.png";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

import { Button, Callout, Card, Flex, Heading } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled(Flex)`
  width: 100%;
  padding: 60px 24px 24px;
  height: calc(100dvh - 72px);
  overflow: auto;

  .card {
    max-width: 720px;
    margin: 0 auto;
    padding: 24px;
    overflow: visible;
  }

  @media screen and (max-width: 480px) {
    padding: 48px 12px 12px;
  }
`;

const Content = styled(Card)`
  img {
    width: clamp(160px, 50%, 320px);
    aspect-ratio: 1/1;
  }
`;

export const OnTheStage = () => {
  return (
    <Container direction="column">
      <Card className="card">
        <Flex direction="column" gap="4">
          <Callout.Root variant="soft" size="2">
            <Callout.Icon>
              <InformationCircleIcon width={24} />
            </Callout.Icon>
            <Callout.Text>
              「舞台に立って(무대에 서서)」는 소년 점프+ 와의 「NHK 스포츠 테마
              2024」 콜라보레이션 단편 코믹스를 원작으로 하며, 원작 만화를
              토대로 한 소설 역시 공개되어 있습니다.
            </Callout.Text>
          </Callout.Root>

          <Flex direction="column" gap="4" className="desc">
            <Content variant="surface">
              <Flex
                direction={{ xs: "row", initial: "column" }}
                gap="4"
                align={{ xs: "end", initial: "center" }}
              >
                <img src={onthestage1} alt="onthestage1" />
                <Flex direction="column" gap="4" width="100%">
                  <Heading
                    size="6"
                    weight="bold"
                    align={{ xs: "left", initial: "center" }}
                  >
                    떨어진 두 사람
                  </Heading>
                  <Flex direction="column" gap="2" width="100%">
                    <Button size="3" asChild variant="outline">
                      <Link to="/onthestage/1">코믹스</Link>
                    </Button>
                    <Button size="3" asChild variant="outline">
                      <Link to="/onthestage/2">소설</Link>
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
            </Content>

            <Content variant="surface">
              <Flex
                direction={{ xs: "row", initial: "column" }}
                gap="4"
                align={{ xs: "end", initial: "center" }}
              >
                <img src={onthestage2} alt="onthestage2" />
                <Flex direction="column" gap="4" width="100%">
                  <Heading
                    size="6"
                    weight="bold"
                    align={{ xs: "left", initial: "center" }}
                  >
                    Parallel Lane
                  </Heading>
                  <Flex direction="column" gap="2" width="100%">
                    <Button size="3" asChild variant="outline">
                      <Link to="/onthestage/3">코믹스</Link>
                    </Button>
                    <Button size="3" asChild variant="outline">
                      <Link to="/onthestage/4">소설</Link>
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
            </Content>

            <Content variant="surface">
              <Flex
                direction={{ xs: "row", initial: "column" }}
                gap="4"
                align={{ xs: "end", initial: "center" }}
              >
                <img src={onthestage3} alt="onthestage3" />
                <Flex direction="column" gap="4" width="100%">
                  <Heading
                    size="6"
                    weight="bold"
                    align={{ xs: "left", initial: "center" }}
                  >
                    끝나지 않는 듀스
                  </Heading>
                  <Flex direction="column" gap="2" width="100%">
                    <Button size="3" asChild variant="outline">
                      <Link to="/onthestage/5">코믹스</Link>
                    </Button>
                    <Button size="3" asChild variant="outline">
                      <Link to="/onthestage/6">소설</Link>
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
            </Content>
          </Flex>
        </Flex>
      </Card>
    </Container>
  );
};
