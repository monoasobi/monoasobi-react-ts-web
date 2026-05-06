import { Text } from "@radix-ui/themes";
import styled from "styled-components";

export const NovelP = styled(Text)<{ $font?: "gothic" | "batang" }>`
  font-family: ${({ $font }) =>
    $font === "gothic" ? '"Pretendard JP Variable"' : '"KoPub Batang"'};
  font-weight: ${({ $font }) => ($font === "gothic" ? "500" : "400")};
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

export const NovelQuote = styled.blockquote`
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

export const NovelHR = styled.hr`
  width: 50%;
  min-width: 80px;
  margin: 3rem auto;
`;

export const NovelUL = styled.ul`
  margin-bottom: 1rem;
`;

export const NovelLI = styled.li<{ $font?: "gothic" | "batang" }>`
  font-family: ${({ $font }) =>
    $font === "gothic" ? '"Pretendard JP Variable"' : '"KoPub Batang"'};
  font-weight: ${({ $font }) => ($font === "gothic" ? "500" : "400")};
  transform: rotate(-0.03deg);
  margin-left: 1rem;
  margin-bottom: 0.25rem;
`;
