import { Music } from "@appTypes/music";
import { sidebarAtom } from "@atoms/sidebar.atom";
import { WrenchIcon } from "@heroicons/react/24/outline";
import { Button, Flex, IconButton, Text } from "@radix-ui/themes";
import { musics } from "@utils/music";
import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

const Container = styled(Flex)`
  padding: 16px;
  width: 320px;
  height: calc(100dvh - 56px);
  background-color: var(--gray-1);
  overflow: auto;
  animation: slide 0.2s ease-in-out;
  box-shadow: 6px 0px 4px -2px var(--black-a4);

  .admin {
    opacity: 0;
    align-self: flex-end;
    transition: opacity 0.7s ease-in-out;
    &:hover {
      opacity: 1;
    }
  }

  @media (max-width: 1024px) {
    position: fixed;
    left: 0;
    top: 56px;
    z-index: 10;
  }

  @keyframes slide {
    0% {
      opacity: 0;
      transform: translateX(-50%);
    }
    100% {
      opacity: 1;
      transform: translateX(0%);
    }
  }
`;

export const MusicList = () => {
  const setIsSidebar = useSetRecoilState(sidebarAtom);

  const sideRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const width = window.innerWidth;
      if (
        sideRef.current &&
        !sideRef.current.contains(event.target as Node) &&
        width < 1024
      ) {
        setIsSidebar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Container
      direction="column"
      gap="2"
      flexBasis="320px"
      flexShrink="0"
      ref={sideRef}
    >
      {musics.map((music) => (
        <Item item={music} key={music.id} />
      ))}
      <IconButton className="admin" variant="outline" color="gray">
        <WrenchIcon width={16} />
      </IconButton>
    </Container>
  );
};

const ItemContainer = styled(Button)`
  flex-direction: column;
  align-items: flex-start;
  height: auto;
  padding: 16px;

  &:not(:disabled) {
    cursor: pointer;
  }
`;

interface ItemProps {
  item: Music;
}

const Item = ({ item }: ItemProps) => {
  const {
    isPublished,
    id,
    translated,
    korTitle,
    novelTitle,
    novelWriter,
    title,
    enTitle,
  } = item;
  const { novelId } = useParams();
  const setIsSidebar = useSetRecoilState(sidebarAtom);

  const closeHandler = () => {
    const width = window.innerWidth;
    if (width < 1024) setIsSidebar(false);
  };
  return (
    <ItemContainer
      variant={novelId === String(id) ? "solid" : "soft"}
      color={isPublished ? "gray" : "red"}
      disabled={!translated && !isPublished}
      asChild
    >
      <Link to={`/${id}`} onClick={closeHandler}>
        <Flex direction="column" gap="1">
          <Text size="5" weight="bold" align="left">
            {korTitle}
          </Text>

          {novelTitle && (
            <Text size="2" weight="bold" align="left">
              {novelWriter} &lt;{novelTitle}&gt;
            </Text>
          )}
          <Text size="1" align="left">
            {title} / {enTitle}
          </Text>
        </Flex>
      </Link>
    </ItemContainer>
  );
};
