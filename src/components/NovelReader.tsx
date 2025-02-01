import { Music } from "@appTypes/music";
import { Error } from "@components/Error";
import { Loading } from "@components/Loading";
import { Flex, Heading, Text } from "@radix-ui/themes";
import { supabase } from "@utils/supabase";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import styled from "styled-components";

const Container = styled(Flex)`
  width: 100%;
  height: calc(100dvh - 116px);
  overflow: auto;
  line-height: 160%;
  padding: 24px;
`;

const NovelContainer = styled.div`
  width: 100%;
  min-height: 100%;
  max-width: 720px;
  padding: 16px;
  .markdown {
    padding-bottom: 24px;
  }
`;

const P = styled(Text)`
  font-family: "KoPub Batang";
  margin-bottom: 16px;
  word-break: keep-all;
  transform: rotate(-0.03deg);
  &:has(br) {
    margin-left: 1rem;
  }
  &:not(:has(br)) {
    text-indent: 1rem;
  }
`;

const Quote = styled.blockquote`
  transform: rotate(-0.03deg);
  background-color: var(--accent-a3);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  margin: 0 0.75rem 1rem 0.75rem;

  & > p {
    text-indent: 0;
    font-family: "Pretendard JP Variable";
    margin-bottom: 0.5rem;
    margin-left: 0;
  }
  & > p:last-child {
    margin-bottom: 0;
  }
`;

interface NovelProps {
  music: Music;
}

export const NovelReader = ({ music }: NovelProps) => {
  const [markdown, setMarkdown] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const novelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchNovel = async (novelId: number) => {
      try {
        setIsLoading(true);
        setIsError(false);
        const { data } = await supabase.storage
          .from("novels")
          .download(`${novelId}.md`);
        setMarkdown(await data?.text());
      } catch (err) {
        console.error(err);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNovel(music.id);
    novelRef.current?.scrollTo(0, 0);
  }, [music]);

  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  return (
    <Container ref={novelRef} justify="center">
      <NovelContainer>
        <ReactMarkdown
          className="markdown"
          remarkPlugins={[remarkBreaks]}
          components={{
            h1(props) {
              const { children } = props;
              return (
                <Heading as="h1" size="7" my="6">
                  {children}
                </Heading>
              );
            },
            h2(props) {
              const { children } = props;
              return (
                <Heading as="h2" my="6" size="6" align="center">
                  {children}
                </Heading>
              );
            },
            h3(props) {
              const { children } = props;
              return (
                <Heading as="h3" my="2" size="6" align="center">
                  {children}
                </Heading>
              );
            },
            p(props) {
              const { children } = props;
              return <P as="p">{children}</P>;
            },
            blockquote(props) {
              const { children } = props;
              return <Quote>{children}</Quote>;
            },
          }}
        >
          {markdown}
        </ReactMarkdown>
      </NovelContainer>
    </Container>
  );
};
