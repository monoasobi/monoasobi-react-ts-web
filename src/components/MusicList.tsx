import { Music } from "@appTypes/music";
import { Button, Flex, Text } from "@radix-ui/themes";
import { musics } from "@utils/music";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled(Flex)`
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

const ItemContainer = styled(Button)<{ $isCurrent: boolean }>`
  flex-direction: column;
  align-items: flex-start;
  margin: 0;
  background-color: ${({ $isCurrent }) =>
    $isCurrent ? `var(--accent-a3)` : `var(--accent-a0)`};
`;

interface ItemProps {
  item: Music;
}

const Item = ({ item }: ItemProps) => {
  const navigate = useNavigate();
  const { novelId } = useParams();
  return (
    <ItemContainer
      $isCurrent={novelId === String(item.id)}
      variant="ghost"
      onClick={() => navigate(`/${item.id}`)}
    >
      <Flex gap="2" align="end">
        <Text size="4" weight="medium">
          {item.korTitle}
        </Text>
      </Flex>
      <Text size="1">
        {item.title} / {item.enTitle}
      </Text>
      {item.novelTitle && (
        <Text size="1">
          {item.novelWriter} &lt;{item.novelTitle}&gt;
        </Text>
      )}
    </ItemContainer>
  );
};
