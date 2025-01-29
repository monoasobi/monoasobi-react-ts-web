import { Music } from "@appTypes/music";
import { Button, Flex, Text } from "@radix-ui/themes";
import { musics } from "@utils/music";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled(Flex)`
  padding: 16px;
  min-width: 320px;
  height: calc(100dvh - 56px);
  overflow: auto;
`;

export const MusicList = () => {
  return (
    <Container direction="column" gap="2">
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
  return (
    <ItemContainer
      variant={novelId === String(id) ? "solid" : "soft"}
      color={isPublished ? "gray" : "red"}
      disabled={!translated && !isPublished}
      asChild
    >
      <Link to={`/${id}`}>
        <Flex direction="column" gap="1">
          <Text size="6" weight="bold" align="left">
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
