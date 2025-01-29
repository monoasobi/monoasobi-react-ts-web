import { Music } from "@appTypes/music";
import { Button, Flex, Text } from "@radix-ui/themes";
import { musics } from "@utils/music";
import { useNavigate, useParams } from "react-router-dom";
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
  const navigate = useNavigate();
  const { novelId } = useParams();
  return (
    <ItemContainer
      variant={novelId === String(item.id) ? "surface" : "outline"}
      onClick={() => navigate(`/${item.id}`)}
      disabled={!item.translated}
    >
      <Flex direction="column" gap="1">
        <Text size="6" weight="bold" align="left">
          {item.korTitle}
        </Text>

        {item.novelTitle && (
          <Text size="2" weight="bold" align="left">
            {item.novelWriter} &lt;{item.novelTitle}&gt;
          </Text>
        )}
        <Text size="1" align="left">
          {item.title} / {item.enTitle}
        </Text>
      </Flex>
    </ItemContainer>
  );
};
