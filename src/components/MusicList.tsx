import { Music } from "@appTypes/music";
import { Button, Flex, Text } from "@radix-ui/themes";
import { musics } from "@utils/music";
import styled from "styled-components";

const Container = styled(Flex)``;

export const MusicList = () => {
  return (
    <Container direction="column" gap="2">
      {musics.map((music) => (
        <Item item={music} />
      ))}
    </Container>
  );
};

const ItemContainer = styled(Button)`
  flex-direction: column;
  align-items: flex-start;
  margin: 0;
`;

interface ItemProps {
  item: Music;
}

const Item = ({ item }: ItemProps) => {
  return (
    <ItemContainer variant="ghost">
      <Text size="4" weight="medium">
        {item.korTitle}
      </Text>
      <Text size="1">{item.title}</Text>
    </ItemContainer>
  );
};
