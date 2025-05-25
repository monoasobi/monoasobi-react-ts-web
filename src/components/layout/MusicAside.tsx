import { Music } from "@appTypes/music";
import { YouTubeEmbed } from "@components/common/YouTubeEmbed";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Button, Card, Flex, Heading } from "@radix-ui/themes";
import { useState } from "react";
import styled from "styled-components";

const Container = styled(Flex)`
  padding: 96px 16px;
  width: clamp(100%, 50dvw, 720px);
  height: calc(100dvh - 56px);
  background-color: var(--gray-1);
  overflow: auto;
  animation: slide 0.2s ease-in-out;
  box-shadow: -4px 8px 6px -2px var(--black-a1);
  position: fixed;
  right: 0;
  top: 56px;

  .closeButton {
    width: 100%;
  }

  @media (min-width: 480px) {
    width: clamp(480px, 50dvw, 720px);
  }

  @keyframes slide {
    0% {
      opacity: 0;
      transform: translateX(50%);
    }
    100% {
      opacity: 1;
      transform: translateX(0%);
    }
  }
`;

const VideoContainer = styled.div<{ $isCollapsed: boolean }>`
  height: ${({ $isCollapsed }) => ($isCollapsed ? "0" : "auto")};
  overflow: hidden;
  transition: height 0.2s ease-in-out;
`;

const CardHeader = styled(Flex)`
  cursor: pointer;
  padding: 8px;
  border-radius: var(--radius-3);
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: var(--gray-3);
  }
`;

interface MusicAsideProps {
  isOpen: boolean;
  onClose: () => void;
  music: Music;
}

export const MusicAside = ({ isOpen, onClose, music }: MusicAsideProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (!isOpen) return null;

  const handleOpenNewWindow = () => {
    window.open(`https://www.youtube.com/watch?v=${music.youtubeId}`, "_blank");
  };

  return (
    <Container direction="column" gap="3">
      <Flex justify="end">
        <Button
          className="closeButton"
          size="2"
          variant="outline"
          onClick={onClose}
        >
          <XMarkIcon width="16" height="16" />
          닫기
        </Button>
      </Flex>
      <Card>
        <Flex direction="column" gap="2">
          <CardHeader
            justify="between"
            align="center"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <Heading size="4" color="red">
              Music Video
            </Heading>
            {isCollapsed ? (
              <ChevronDownIcon width="20" height="20" />
            ) : (
              <ChevronUpIcon width="20" height="20" />
            )}
          </CardHeader>
          <VideoContainer $isCollapsed={isCollapsed}>
            <Flex direction="column" gap="2">
              <YouTubeEmbed videoId={music.youtubeId} />
              <Button size="2" variant="soft" onClick={handleOpenNewWindow}>
                새창으로 보기
              </Button>
            </Flex>
          </VideoContainer>
        </Flex>
      </Card>
    </Container>
  );
};
