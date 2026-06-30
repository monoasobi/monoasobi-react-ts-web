import logowith from "@assets/logowith.svg";
import yoasobi from "@assets/yoasobi.jpg";
import { ArrowDownIcon } from "@heroicons/react/24/solid";
import { Card, Flex, Heading, ScrollArea, Text } from "@radix-ui/themes";
import styled from "styled-components";

const Container = styled(ScrollArea)`
  width: 100%;
  height: calc(100dvh - 56px);

  .rt-ScrollAreaViewport {
    line-height: 160%;
    padding: 24px;
  }

  .card {
    padding: 16px;
    overflow: visible;
  }

  .yoasobi {
    width: 90%;
    max-width: 960px;
  }

  .logo {
    width: 240px;
  }

  .desc {
    width: 90%;
    max-width: 480px;
  }

  .admin {
    margin-top: 16px;
    opacity: 0;
    align-self: flex-end;
    transition: opacity 0.7s ease-in-out;
    &:hover {
      opacity: 1;
    }
  }
`;

export const Home = () => {
  return (
    <Container scrollbars="vertical">
      <Flex direction="column">
        <Card className="card">
          <Flex direction="column" align="center" gap="4">
            <img className="yoasobi" src={yoasobi} alt="yoasobi" />
            <Flex direction="column" align="center" gap="2">
              <img src={logowith} alt="logo" className="logo" />
            </Flex>

            <Flex direction="column" gap="4" className="desc">
              <Text size="2">
                모노아소비는 요아소비(YOASOBI)의 음악이 원작으로 삼고 있는
                소설과 그 번역본을 한곳에 모아 제공하는 사이트입니다.
              </Text>
              <Text size="2">
                모노아소비는 더 많은 사람들이 원작 소설을 즐길 수 있도록 돕고,
                요아소비의 음악을 더욱 깊이 사랑하게 되기를 바라는 마음으로
                운영됩니다.
              </Text>
              <Text size="2">
                사이트에 게시된 모든 원작 소설과 번역본의 저작권은 각각의 작가와
                번역자에게 있으며, 모노아소비는 이 자료들을 공유함으로써 어떠한
                상업적 이익도 추구하지 않습니다.
              </Text>
              <Card>
                <Heading as="h3" size="3">
                  주인장 추천 루트
                </Heading>
                <Flex direction="column" gap="2" align="center">
                  <Text size="2" align="center">
                    소설을 읽는다
                  </Text>
                  <ArrowDownIcon width={12} />
                  <Text size="2" align="center">
                    번역된 가사와 함께 노래를 들으며
                    <br />
                    아야세의 작사 실력에 감탄한다
                  </Text>
                  <ArrowDownIcon width={12} />
                  <Text size="2" align="center">
                    뮤직비디오를 감상하며
                    <br />
                    소설에 등장한 디테일을 발견하고 감탄한다
                  </Text>
                  <ArrowDownIcon width={12} />
                  <Text size="2" align="center">
                    입덕완료!
                  </Text>
                </Flex>
              </Card>
              <Text size="2" align="center" weight="bold">
                번역 투고 및 기타 문의 :{" "}
                <a href="mailto:envi.9.official@gmail.com?subject=모노아소비 문의">
                  envi.9.official@gmail.com
                </a>
              </Text>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </Container>
  );
};
