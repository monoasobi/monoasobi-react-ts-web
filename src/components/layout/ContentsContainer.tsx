import { Music } from "@appTypes/music";
import { YouTubeLyricsPlayer } from "@components/common/YouTubeLyricsPlayer";
import { MusicalNoteIcon } from "@heroicons/react/16/solid";
import {
  BookOpenIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import {
  Button,
  Card,
  DataList,
  Flex,
  Heading,
  IconButton,
  Popover,
  Text,
} from "@radix-ui/themes";
import { ReactNode } from "react";
import { Link, useSearchParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled(Flex)`
  width: 100%;
  padding: 8px;
  position: relative;

  .headerButton {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);

    @media (max-width: 480px) {
      right: 12px;
    }
  }
`;

const Header = styled(Card)`
  position: absolute;
  top: 0;
  display: flex;
  width: 95%;
  background-color: var(--gray-1);
  box-shadow: 0px 6px 8px -2px var(--black-a1);
  justify-content: flex-start;
  align-items: center;
  padding: 12px 56px;
  z-index: 5;

  visibility: visible;
  &.notVisible {
    visibility: hidden;
  }

  @media (max-width: 480px) {
    padding: 12px 44px;
  }
`;

const HeaderInfo = styled(Flex)`
  width: 100%;
  min-width: 0;
`;

const HeaderTitle = styled(Text)`
  display: block;
  max-width: 100%;
`;

const HeaderHeading = styled(Heading)`
  display: block;
  max-width: 100%;
`;

const FloatingToggle = styled(IconButton)`
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 10;
  width: 48px;
  height: 48px;
  border-radius: 999px;
  background-color: var(--red-9);
  color: var(--red-contrast);
  box-shadow: 0 0 24px var(--black-a4);

  &:hover {
    background-color: var(--red-10);
  }

  @media (max-width: 480px) {
    right: 16px;
    bottom: 16px;
  }
`;

interface ContentsContainerProps {
  children: ReactNode;
  music: Music;
  content?: {
    title: string;
    writer: string;
    originUrl: string;
    translator?: string;
    translatorUrl?: string;
  };
}

export const ContentsContainer = ({
  children,
  music,
  content,
}: ContentsContainerProps) => {
  const { title, korTitle } = music;
  const [searchParams, setSearchParams] = useSearchParams();
  const isLyrics = searchParams.get("view") === "lyrics";

  const handleTabChange = () => {
    setSearchParams(isLyrics ? {} : { view: "lyrics" });
  };

  return (
    <Popover.Root>
      <Container direction="column" align="center">
        <Header variant="surface">
          <HeaderInfo direction="column" align="center">
            <HeaderTitle size="2" weight="bold" color="red" truncate>
              {korTitle} {korTitle !== title && title}
            </HeaderTitle>
            {content?.title && (
              <HeaderHeading size="2" truncate>
                {content?.writer} &lt;{content.title}&gt;
              </HeaderHeading>
            )}
          </HeaderInfo>
          <Flex gap="2" className="headerButton">
            <Popover.Trigger>
              <IconButton size="1" variant="soft">
                <EllipsisHorizontalIcon width="16" height="16" />
              </IconButton>
            </Popover.Trigger>
          </Flex>
          <Popover.Content maxWidth="320px">
            <Flex direction="column" gap="3">
              <DataList.Root>
                {content?.translator && content?.translatorUrl && (
                  <DataList.Item align="center">
                    <DataList.Label minWidth="32px">역자</DataList.Label>
                    <DataList.Value>
                      <Button variant="outline" size="1" asChild>
                        <Link to={content.translatorUrl} target="_blank">
                          {content.translator}
                        </Link>
                      </Button>
                    </DataList.Value>
                  </DataList.Item>
                )}
                {content?.originUrl && (
                  <DataList.Item align="center">
                    <DataList.Label minWidth="32px">원문</DataList.Label>
                    <DataList.Value>
                      <Button variant="outline" size="1" asChild>
                        <Link to={content.originUrl} target="_blank">
                          보러가기
                        </Link>
                      </Button>
                    </DataList.Value>
                  </DataList.Item>
                )}
              </DataList.Root>
            </Flex>
          </Popover.Content>
        </Header>
        {isLyrics ? <YouTubeLyricsPlayer music={music} /> : children}
        <FloatingToggle size="3" variant="solid" onClick={handleTabChange}>
          {isLyrics ? (
            <BookOpenIcon width="20" height="20" />
          ) : (
            <MusicalNoteIcon width="20" height="20" />
          )}
        </FloatingToggle>
      </Container>
      {/* <MusicAside
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        music={music}
      /> */}
    </Popover.Root>
  );
};
