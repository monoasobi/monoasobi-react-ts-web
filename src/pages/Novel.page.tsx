import { Flex, Heading, Text } from "@radix-ui/themes";
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
  max-width: 720px;
  padding: 16px;
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
  padding: 1rem;
  margin-bottom: 1rem;
  & > p {
    font-family: "Pretendard JP Variable";
  }
  & > p:last-child {
    margin-bottom: 0;
  }
`;

export const Novel = () => {
  const { novelId } = useParams();
  const [markdown, setMarkdown] = useState("");
  const novelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    fetch(`./novel/${novelId}.md`)
      .then((response) => response.text())
      .then((text) => setMarkdown(text));

    novelRef.current?.scrollTo(0, 0);
  }, [novelId]);
  return (
    <Container ref={novelRef} justify="center">
      <NovelContainer>
        <ReactMarkdown
          remarkPlugins={[remarkBreaks]}
          components={{
            h1(props) {
              const { children } = props;
              return (
                <Heading as="h1" size="7" my="4">
                  {children}
                </Heading>
              );
            },
            h2(props) {
              const { children } = props;
              return (
                <Heading as="h2" my="3" size="6" align="center">
                  {children}
                </Heading>
              );
            },
            h3(props) {
              const { children } = props;
              return (
                <Heading as="h3" my="2" size="4" align="center">
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
