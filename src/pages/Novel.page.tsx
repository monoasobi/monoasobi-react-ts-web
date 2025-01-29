import { Heading, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import remarkBreaks from "remark-breaks";
import styled from "styled-components";

const Container = styled.div`
  height: calc(100dvh - 56px);
  overflow: auto;
  padding: 24px;
  /* line-height: 160%; */
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

export const Novel = () => {
  const { novelId } = useParams();
  const [markdown, setMarkdown] = useState("");
  useEffect(() => {
    fetch(`./novel/${novelId}.md`)
      .then((response) => response.text())
      .then((text) => setMarkdown(text));
  }, [novelId]);
  return (
    <Container>
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
        }}
      >
        {markdown}
      </ReactMarkdown>
    </Container>
  );
};
