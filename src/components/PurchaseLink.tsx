import { Button, Card, Flex, Heading, Separator, Text } from "@radix-ui/themes";
import { books } from "@utils/book";
import { musics } from "@utils/music";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled(Flex)`
  width: 100%;
  max-width: 1024px;
  padding: 92px 24px 24px;
  height: calc(100dvh - 72px);
  overflow: auto;

  .card {
    padding: 24px;
    overflow: visible;
  }

  .bookImg {
    width: 50%;
    max-width: 280px;
    box-shadow: 2px 2px 12px 2px var(--black-a4);
  }
`;

interface PurchaseLinkProps {
  bookId: number;
}

export const PurchaseLink = ({ bookId }: PurchaseLinkProps) => {
  const book = books[bookId - 1];

  return (
    <Container direction="column">
      <Card className="card">
        <Heading>소설집 구매 안내</Heading>
        <Text size="2">
          해당 작품은 국내에 정식으로 발간되어 제공이 불가합니다.
        </Text>
        <Flex direction="column" justify="center" align="center" my="4" gap="3">
          <Flex
            gap="6"
            width="100%"
            justify="center"
            align={{ md: "end", initial: "center" }}
            direction={{ initial: "column", md: "row" }}
          >
            <img
              className="bookImg"
              src={`./images/${bookId}.jpg`}
              alt={`${book.name}`}
            />
            <Flex direction="column" gap="4">
              <Heading align={{ md: "left", initial: "center" }}>
                {book.name}
              </Heading>
              <Separator size="4" />
              <Flex direction="column" gap="2">
                {book.novelIds.map((id) => (
                  <Text align="center" size="2" color="gray" key={id}>{`${
                    musics[id - 1].korTitle
                  } <${musics[id - 1].novelTitle}>`}</Text>
                ))}
                <Text align="center" size="2" color="red" weight="medium">
                  총 {book.novelIds.length}편 수록
                </Text>
              </Flex>
              <Flex wrap="wrap" gap="2" justify="center">
                <Button asChild>
                  <Link to={book.purchaseLinks.kyoboURL} target="_blank">
                    교보문고
                  </Link>
                </Button>
                <Button asChild>
                  <Link to={book.purchaseLinks.yes24URL} target="_blank">
                    yes24
                  </Link>
                </Button>
                <Button asChild>
                  <Link to={book.purchaseLinks.aladinURL} target="_blank">
                    알라딘
                  </Link>
                </Button>
                <Button asChild>
                  <Link to={book.purchaseLinks.ridiURL} target="_blank">
                    리디북스
                  </Link>
                </Button>
                <Button asChild>
                  <Link to={book.purchaseLinks.naverURL} target="_blank">
                    네이버 시리즈
                  </Link>
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </Container>
  );
};
