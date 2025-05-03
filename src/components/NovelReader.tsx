import { adminAtom } from "@atoms/admin.atom";
import { Error } from "@components/Error";
import { Loading } from "@components/Loading";
import { Flex, Heading, Text } from "@radix-ui/themes";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useRecoilValue } from "recoil";
import remarkBreaks from "remark-breaks";
import styled from "styled-components";

const Container = styled(Flex)`
  width: 100%;
  height: calc(100dvh - 72px);
  overflow: auto;
  line-height: 160%;
  padding: 92px 24px 24px;
  @media screen and (max-width: 480px) {
    padding: 92px 12px 12px;
  }
`;

const NovelContainer = styled.div`
  width: 100%;
  min-height: 100%;
  max-width: 720px;
  padding: 1rem;
  .markdown {
    padding-bottom: 24px;
  }
`;

const P = styled(Text)`
  font-family: "KoPub Batang";
  margin-bottom: 1rem;
  transform: rotate(-0.03deg);
  &:has(br) {
    margin-left: 1rem;
    line-height: 1.75rem;
  }
  &:not(:has(br)) {
    text-indent: 1rem;
  }
`;

const Quote = styled.blockquote`
  background-color: var(--accent-a3);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;

  & > p {
    text-indent: 0;
    transform: rotate(-0.03deg);
    font-family: "Pretendard JP Variable";
    margin-bottom: 0.5rem;
    margin-left: 0;
  }
  & > p:last-child {
    margin-bottom: 0;
  }
`;

const HR = styled.hr`
  width: 50%;
  min-width: 80px;
  margin: 1.5rem auto;
`;

const UL = styled.ul`
  margin-bottom: 1rem;
`;

const LI = styled.li`
  font-family: "KoPub Batang";
  transform: rotate(-0.03deg);
  margin-left: 1rem;
  margin-bottom: 0.25rem;
`;

interface NovelProps {
  id: number | string;
}

export const NovelReader = ({ id }: NovelProps) => {
  const [markdown, setMarkdown] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const novelRef = useRef<HTMLDivElement>(null);
  const admin = useRecoilValue(adminAtom);
  useEffect(() => {
    const fetchNovel = async (novelId: number | string) => {
      try {
        setIsLoading(true);
        setIsError(false);
        if (import.meta.env.MODE === "development") {
          const res = await fetch(`${location.origin}/novel/${id}.md`);
          const data = await res.text();
          setMarkdown(data);
        } else {
          const res = await fetch(
            `${import.meta.env.VITE_WORKER_URL}/novel/${novelId}`,
            {
              headers: {
                authorization: admin ? "monoasobi" : "yoasobi",
              },
            }
          );
          setMarkdown(await res.text());
        }
      } catch (err) {
        console.error(err);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNovel(id);
  }, [id, admin]);

  useEffect(() => {
    if (!markdown) return;
    const novelElement = novelRef.current;
    if (novelElement) {
      const scrollTop = localStorage.getItem(`novel-${id}`);
      if (scrollTop) novelElement.scrollTo(0, parseInt(scrollTop, 10) || 0);
    }
  }, [markdown, id]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const scrollTop = el.scrollTop;
    const scrollKey = `novel-${id}`;

    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 1) {
      localStorage.removeItem(scrollKey); // 끝까지 읽었을 때 삭제
    } else {
      localStorage.setItem(scrollKey, scrollTop.toString()); // 중간 저장
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  return (
    <Container as="div" justify="center" ref={novelRef} onScroll={handleScroll}>
      <NovelContainer>
        <ReactMarkdown
          className="markdown"
          remarkPlugins={[remarkBreaks]}
          components={{
            h1: ({ children }) => (
              <Heading as="h1" size="7" my="6">
                {children}
              </Heading>
            ),
            h2: ({ children }) => (
              <Heading as="h2" my="6" size="6" align="center">
                {children}
              </Heading>
            ),
            h3: ({ children }) => (
              <Heading as="h3" my="2" size="6" align="center">
                {children}
              </Heading>
            ),
            h4: ({ children }) => (
              <Heading as="h3" my="4" size="4" align="center">
                {children}
              </Heading>
            ),
            p: ({ children }) => <P as="p">{children}</P>,
            blockquote: ({ children }) => <Quote>{children}</Quote>,
            hr: (props) => <HR {...props} />,
            ul: (props) => <UL {...props} />,
            li: (props) => {
              const { children } = props;
              const text = children?.toString();
              const match = text!.match(/^(.+?)\s*(「.*」)$/);
              if (!match) return <LI {...props} />;
              const [, speaker, dialogue] = match;
              return (
                <LI>
                  <Text color="red" weight="bold" mr="2">
                    {speaker}
                  </Text>
                  <Text>{dialogue}</Text>
                </LI>
              );
            },
            strong: ({ children }) => (
              <Text color="red" weight="bold">
                {children}
              </Text>
            ),
          }}
        >
          {markdown}
        </ReactMarkdown>
      </NovelContainer>
    </Container>
  );
};
