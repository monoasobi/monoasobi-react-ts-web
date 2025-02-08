import { Flex } from "@radix-ui/themes";
import { useEffect, useRef } from "react";
import styled from "styled-components";

const Container = styled(Flex)`
  width: 100%;
  height: calc(100dvh - 72px);
  overflow: auto;
  line-height: 160%;
  padding: 92px 24px 92px;
  @media screen and (max-width: 480px) {
    padding: 92px 12px 12px;
  }
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

  @media screen and (max-width: 480px) {
    padding: 0px;
  }
`;

interface ComicProps {
  id: number;
  length: number;
}

const url =
  "https://btzvusbfitsmxtslhnkb.supabase.co/storage/v1/object/public/comics";

export const ComicReader = ({ id, length }: ComicProps) => {
  const comicRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    comicRef.current?.scrollTo(0, 0);
  }, []);

  return (
    <Container ref={comicRef} justify="center" pb="6">
      <ComicContainer direction="column" gap="3">
        {new Array(length).fill("").map((_, idx) => (
          <img key={idx} src={`${url}/${id}/${idx}.jpg`} alt={idx.toString()} />
        ))}
      </ComicContainer>
    </Container>
  );
};
