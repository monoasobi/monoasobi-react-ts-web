import { Error } from "@components/Error";
import { Loading } from "@components/Loading";
import { Flex, ScrollArea } from "@radix-ui/themes";
import { getFileNum } from "@utils/file";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Container = styled(ScrollArea)`
  width: 100%;
  height: calc(100dvh - 72px);

  .rt-ScrollAreaViewport {
    line-height: 160%;
    padding: 64px 24px 92px;
  }

  @media (max-width: 480px) {
    .rt-ScrollAreaViewport {
      padding: 64px 12px 12px;
    }
  }
`;

const ReaderFrame = styled(Flex)`
  width: 100%;
  min-height: 100%;
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
          `${import.meta.env.VITE_WORKER_URL}/comic/${comicId}`,
        );
        const data: string[] = await res.json();
        const sorted = [...data].sort((a, b) => getFileNum(a) - getFileNum(b));
        setImageUrls(sorted);
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
    <Container ref={comicRef} onScroll={handleScroll} scrollbars="vertical">
      <ReaderFrame justify="center">
        <ComicContainer direction="column" gap="3">
          {imageUrls.map((url, idx) => (
            <img
              key={idx}
              src={url}
              alt={idx.toString()}
              loading={idx < 4 ? "eager" : "lazy"}
            />
          ))}
        </ComicContainer>
      </ReaderFrame>
    </Container>
  );
};
