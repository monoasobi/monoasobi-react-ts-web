import { Error } from "@components/Error";
import { Loading } from "@components/Loading";
import { Flex } from "@radix-ui/themes";
import { useEffect, useRef, useState } from "react";
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
}

export const ComicReader = ({ id }: ComicProps) => {
  const comicRef = useRef<HTMLDivElement>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchComic = async (comicId: number | string) => {
      try {
        setIsLoading(true);
        setIsError(false);

        const res = await fetch(
          `${import.meta.env.VITE_WORKER_URL}/comic/${comicId}`
        );
        setImageUrls(await res.json());
      } catch (err) {
        console.error(err);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchComic(id);
  }, [id]);

  useEffect(() => {
    if (!imageUrls) return;
    const comicElement = comicRef.current;
    if (comicElement) {
      const scrollTop = localStorage.getItem(`comic-${id}`);
      if (scrollTop) comicElement.scrollTo(0, parseInt(scrollTop, 10) || 0);
    }
  }, [imageUrls, id]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const scrollTop = el.scrollTop;
    const scrollKey = `comic-${id}`;

    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 1) {
      localStorage.removeItem(scrollKey); // 끝까지 읽었을 때 삭제
    } else {
      localStorage.setItem(scrollKey, scrollTop.toString()); // 중간 저장
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  return (
    <Container ref={comicRef} justify="center" pb="6" onScroll={handleScroll}>
      <ComicContainer direction="column" gap="3">
        {imageUrls.map((url, idx) => (
          <img key={idx} src={url} alt={idx.toString()} />
        ))}
      </ComicContainer>
    </Container>
  );
};
