import logowith from "@assets/logowith.svg";
import yoasobi from "@assets/yoasobi.jpg";
import { HeartIcon } from "@heroicons/react/24/outline";
import {
  BookOpenIcon,
  LanguageIcon,
  MusicalNoteIcon,
  PlayCircleIcon,
  RectangleStackIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import {
  Button,
  Card,
  Flex,
  Heading,
  ScrollArea,
  Text,
} from "@radix-ui/themes";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled(ScrollArea)`
  width: 100%;
  height: calc(100dvh - 56px);
  background-color: var(--gray-1);

  .rt-ScrollAreaViewport {
    line-height: 160%;
  }
`;

const Page = styled.main`
  width: 100%;
`;

const Hero = styled.section<{ $image: string }>`
  position: relative;
  display: flex;
  min-height: min(680px, calc(100dvh - 96px));
  align-items: end;
  background-image:
    linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.76) 0%,
      rgba(0, 0, 0, 0.48) 44%,
      rgba(0, 0, 0, 0.16) 100%
    ),
    url(${({ $image }) => $image});
  background-position: center;
  background-size: cover;
  color: white;

  @media (max-width: 1024px) {
    min-height: 480px;
  }

  @media (max-width: 480px) {
    min-height: 360px;
  }
`;

const HeroInner = styled(Flex)`
  width: 100%;
  max-width: 1120px;
  padding: 72px 32px 56px;
  margin: 0 auto;

  @media (max-width: 480px) {
    padding: 56px 20px 40px;
  }
`;

const HeroCopy = styled(Text)`
  max-width: 560px;
  color: rgba(255, 255, 255, 0.88);
`;

const Section = styled.section`
  width: 100%;
  padding: 64px 32px;

  @media (max-width: 480px) {
    padding: 48px 20px;
  }
`;

const SectionInner = styled(Flex)`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
`;

const Eyebrow = styled(Text)`
  color: var(--red-10);
  font-weight: 700;
`;

const Logo = styled.img`
  width: 60%;
  align-self: center;
  margin: 32px 0;
`;

const FeatureGrid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled(Card)`
  padding: 20px;
  overflow: visible;
`;

const IconShell = styled(Flex)`
  width: 40px;
  height: 40px;
  border-radius: 999px;
  background-color: var(--red-a3);
  color: var(--red-10);
  flex-shrink: 0;
`;

const RouteCard = styled(Card)`
  padding: 20px;
  overflow: visible;
`;

const RouteIconContain = styled.div`
  padding: 4px;
  display: flex;
  justify-content: center;
  align-item: center;
`;

const RouteStep = styled(Flex)`
  padding: 14px 0;

  & + & {
    border-top: 1px solid var(--gray-a4);
  }
`;

const NoticeBand = styled.section`
  background-color: var(--gray-2);
  border-block: 1px solid var(--gray-a4);
`;

interface FeatureItem {
  icon: typeof BookOpenIcon;
  title: string;
  description: string;
  to?: string;
  action?: string;
}

const features: FeatureItem[] = [
  {
    icon: BookOpenIcon,
    title: "YOASOBI 노래의 원작 읽기",
    description:
      "YOASOBI 음악의 원작 소설을 곡별로 정리하고, 한국어 번역본을 바로 읽을 수 있게 제공합니다.",
  },
  {
    icon: MusicalNoteIcon,
    title: "소설을 읽은 후 가사 곱씹어보기",
    description:
      "작품 페이지 우측 하단의 버튼을 누르면 해당 곡의 MV와 싱크 가사 화면으로 전환됩니다.",
  },
  {
    icon: RectangleStackIcon,
    title: "코믹스와 스페셜 콘텐츠",
    description:
      "「舞台に立って」처럼 소설 외 원작이 있는 곡은 코믹스와 별도 안내 페이지로 묶어 제공합니다.",
  },
  {
    icon: ShoppingBagIcon,
    title: "정식 출판본 안내",
    description:
      "국내 정식 출판으로 전문을 제공하기 어려운 작품은 수록 도서와 구매처를 안내합니다.",
  },
];

export const Overview = () => {
  return (
    <Container scrollbars="vertical">
      <Page>
        <Hero $image={yoasobi}>
          <HeroInner direction="column" gap="5">
            <Flex direction="column" gap="3">
              <Heading as="h1" size="8">
                YOASOBI 음악 너머의 이야기를 발견하다
              </Heading>
              <HeroCopy size="4">
                모노아소비는 요아소비(YOASOBI)의 음악이 원작으로 삼고 있는
                소설과 번역본, 가사를 한곳에 모아 제공하는 사이트입니다.
              </HeroCopy>
            </Flex>
          </HeroInner>
        </Hero>

        <NoticeBand>
          <Section>
            <SectionInner direction="column" gap="4">
              <Flex direction="column" gap="2">
                <Eyebrow size="2">ABOUT</Eyebrow>
                <Heading as="h2" size="6">
                  MONOASOBI?
                </Heading>
              </Flex>
              <Flex direction="column" gap="3">
                <Logo src={logowith} />
                <Text size="3">
                  모노아소비는 요아소비(YOASOBI)의 음악이 원작으로 삼고 있는
                  소설과 그 번역본을 한곳에 모아 제공하는 사이트입니다.
                </Text>
                <Text size="3">
                  모노아소비는 더 많은 사람들이 원작 소설을 즐길 수 있도록 돕고,
                  요아소비의 음악을 더욱 깊이 사랑하게 되기를 바라는 마음으로
                  운영됩니다.
                </Text>
                <Text size="3">
                  사이트에 게시된 모든 원작 소설과 번역본의 저작권은 각각의
                  작가와 번역자에게 있으며, 모노아소비는 이 자료들을
                  공유함으로써 어떠한 상업적 이익도 추구하지 않습니다.
                </Text>
              </Flex>
            </SectionInner>
          </Section>
        </NoticeBand>

        <Section>
          <SectionInner direction="column" gap="5">
            <Flex direction="column" gap="2">
              <Eyebrow size="2">FEATURES</Eyebrow>
              <Heading as="h2" size="7">
                콘텐츠와 기능
              </Heading>
            </Flex>
            <FeatureGrid>
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <FeatureCard key={feature.title}>
                    <Flex direction="column" gap="4">
                      <IconShell align="center" justify="center">
                        <Icon width={22} height={22} />
                      </IconShell>
                      <Flex direction="column" gap="2">
                        <Heading as="h3" size="4">
                          {feature.title}
                        </Heading>
                        <Text size="2" color="gray">
                          {feature.description}
                        </Text>
                      </Flex>
                      {feature.to && feature.action && (
                        <Button size="2" variant="soft" asChild>
                          <Link to={feature.to}>{feature.action}</Link>
                        </Button>
                      )}
                    </Flex>
                  </FeatureCard>
                );
              })}
            </FeatureGrid>
          </SectionInner>
        </Section>

        <Section>
          <SectionInner direction="column" gap="5">
            <Flex direction="column" gap="2">
              <Eyebrow size="2">MELTIN' FLOW</Eyebrow>
              <Heading as="h2" size="7">
                주인장 추천 루트
              </Heading>
            </Flex>

            <RouteCard>
              <RouteStep align="center" justify="between" gap="4">
                <Text size="3" weight="bold">
                  소설을 읽는다
                </Text>
                <RouteIconContain>
                  <BookOpenIcon width={24} height={24} />
                </RouteIconContain>
              </RouteStep>
              <RouteStep align="center" justify="between" gap="4">
                <Text size="3" weight="bold">
                  번역된 가사와 함께 노래를 들으며 아야세의 작사 실력에 감탄한다
                </Text>
                <RouteIconContain>
                  <MusicalNoteIcon width={24} height={24} />
                </RouteIconContain>
              </RouteStep>
              <RouteStep align="center" justify="between" gap="4">
                <Text size="3" weight="bold">
                  뮤직비디오를 감상하며 소설에 등장한 디테일을 발견하고 감탄한다
                </Text>
                <RouteIconContain>
                  <PlayCircleIcon width={24} height={24} />
                </RouteIconContain>
              </RouteStep>
              <RouteStep align="center" justify="between" gap="4">
                <Text size="3" weight="bold" color="red">
                  입덕완료!
                </Text>
                <RouteIconContain>
                  <HeartIcon width={24} height={24} />
                </RouteIconContain>
              </RouteStep>
            </RouteCard>
          </SectionInner>
        </Section>

        <Section>
          <SectionInner direction="column" gap="4">
            <Flex align="center" gap="3">
              <IconShell align="center" justify="center">
                <LanguageIcon width={22} height={22} />
              </IconShell>
              <Flex direction="column" gap="1">
                <Heading as="h2" size="5">
                  번역 투고 및 기타 문의
                </Heading>
                <Text size="2" color="gray">
                  번역본 제공, 출처 수정, 사이트 관련 문의를 받을 수 있습니다.
                </Text>
              </Flex>
            </Flex>
            <Button size="3" variant="outline" asChild>
              <a href="mailto:envi.9.official@gmail.com?subject=모노아소비 문의">
                envi.9.official@gmail.com
              </a>
            </Button>
          </SectionInner>
        </Section>
      </Page>
    </Container>
  );
};
