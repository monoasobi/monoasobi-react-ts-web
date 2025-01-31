import { Music } from "@appTypes/music";
import { adminAtom } from "@atoms/admin.atom";
import { sidebarAtom } from "@atoms/sidebar.atom";
import { Button, Dialog, Flex, Text } from "@radix-ui/themes";
import { musics } from "@utils/music";
import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

const Container = styled(Flex)`
  padding: 16px;
  width: 320px;
  height: calc(100dvh - 56px);
  background-color: var(--gray-1);
  overflow: auto;
  animation: slide 0.2s ease-in-out;
  box-shadow: 6px 12px 12px -2px var(--black-a1);

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

export const Sidebar = () => {
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
  const isAdmin = useRecoilValue(adminAtom);

  const closeHandler = () => {
    const width = window.innerWidth;
    if (width < 1024) setIsSidebar(false);
  };
  return (
    <Dialog.Root>
      <ItemContainer
        variant={novelId === String(id) ? "solid" : "soft"}
        color={isAdmin ? "red" : isPublished ? "gray" : "red"}
        disabled={!translated}
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
    </Dialog.Root>
  );
};
