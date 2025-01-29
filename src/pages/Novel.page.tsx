import { Flex, Heading, Text } from "@radix-ui/themes";
import { musics } from "@utils/music";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import remarkBreaks from "remark-breaks";
import styled from "styled-components";

const Container = styled(Flex)`
  width: 100%;
  height: calc(100dvh - 56px);
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
  }
  & > p:last-child {
    margin-bottom: 0;
  }
`;

export const Novel = () => {
  const { novelId } = useParams();
  const music = musics[Number(novelId) - 1];
  const isNotFound = !music;
  if (isNotFound) return null;
  const [markdown, setMarkdown] = useState("");
  const novelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`./novel/${novelId}.md`)
      .then((response) => response.text())
      .then((text) => setMarkdown(text));

    novelRef.current?.scrollTo(0, 0);
  }, [novelId]);

  // if (music.isPublished) return <>구매해라 애송이</>;
  if (!music.translated) return <>번역해라 애송이</>;
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
