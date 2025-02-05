import { Comic } from "@appTypes/comic";
import { Flex } from "@radix-ui/themes";
import { useEffect, useRef } from "react";
import styled from "styled-components";

const Container = styled(Flex)`
  width: 100%;
  height: calc(100dvh - 72px);
  overflow: auto;
  line-height: 160%;
  padding: 92px 24px 92px;
`;

const ComicContainer = styled(Flex)`
  width: 100%;
  min-height: 100%;
  max-width: 720px;
  padding: 16px;
  > img {
    width: 100%;
    &:last-child {
      margin-bottom: 24px;
    }
  }
`;

interface ComicProps {
  comic: Comic;
}

const url =
  "https://btzvusbfitsmxtslhnkb.supabase.co/storage/v1/object/public/comics";

export const ComicReader = ({ comic }: ComicProps) => {
  const comicRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    comicRef.current?.scrollTo(0, 0);
  }, []);

  return (
    <Container ref={comicRef} justify="center" pb="6">
      <ComicContainer direction="column" gap="3">
        {new Array(comic.length).fill("").map((_, idx) => (
          <img
            key={idx}
            src={`${url}/${comic.id}/${idx}.jpg`}
            alt={idx.toString()}
          />
        ))}
      </ComicContainer>
    </Container>
  );
};
