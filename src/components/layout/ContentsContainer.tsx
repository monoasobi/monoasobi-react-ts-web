import { Music } from "@appTypes/music";
import { MusicalNoteIcon } from "@heroicons/react/16/solid";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
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
import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { MusicAside } from "./MusicAside";

const Container = styled(Flex)`
  width: 100%;
  padding: 8px;
  position: relative;

  .headerButton {
    position: absolute;
    right: 16px;
  }
`;

const Header = styled(Card)`
  position: absolute;
  top: 0;
  display: flex;
  width: 95%;
  background-color: var(--gray-1);
  box-shadow: 0px 6px 8px -2px var(--black-a1);
  justify-content: center;
  align-items: center;
  padding: 8px 8px;
  z-index: 1;

  visibility: visible;
  &.notVisible {
    visibility: hidden;
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Popover.Root>
      <Container direction="column" align="center">
        <Header variant="surface">
          <Flex direction="column" align="center">
            <Text size="2" weight="bold" color="red">
              {korTitle} {korTitle !== title && title}
            </Text>
            <Heading size="2">{content?.writer}</Heading>
            {content?.title && (
              <Heading size="2">&lt;{content.title}&gt;</Heading>
            )}
          </Flex>
          <Flex gap="2" className="headerButton">
            <IconButton
              size="1"
              variant="soft"
              onClick={() => setIsSidebarOpen(true)}
            >
              <MusicalNoteIcon width="16" height="16" />
            </IconButton>
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
        {children}
      </Container>
      <MusicAside
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        music={music}
      />
    </Popover.Root>
  );
};
