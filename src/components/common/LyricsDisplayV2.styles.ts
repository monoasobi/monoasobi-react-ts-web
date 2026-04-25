import { CallType } from "@appTypes/lyric";
import { Flex, Text } from "@radix-ui/themes";
import styled, { css } from "styled-components";

export type GroupPos = "solo" | "first" | "middle" | "last";

export const Container = styled(Flex)`
  min-height: 0;
`;

export const Header = styled(Flex)`
  padding: 4px 0;
`;

export const JumpButtons = styled(Flex)`
  min-width: 0;
  overflow-x: auto;
  padding-bottom: 2px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Icon = styled.span`
  display: inline-flex;

  svg {
    width: 14px;
    height: 14px;
  }
`;

export const ScrollWrapper = styled.div`
  position: relative;
  flex: 1;
  border: 1px solid var(--red-5);
  border-radius: var(--radius-4);
  background-color: var(--red-1);
`;

export const Scroll = styled.div`
  height: 100%;
  overflow-y: auto;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const callStyle = ($callType?: CallType) => {
  if ($callType === "LOUD") {
    return css`
      border-color: var(--red-7);

      ${Reading} {
        color: var(--red-11);
      }
    `;
  }

  if ($callType === "CLAP") {
    return css`
      border-color: var(--amber-7);

      ${Reading} {
        color: var(--amber-11);
      }
    `;
  }

  if ($callType === "CUSTOM") {
    return css`
      border-color: var(--teal-7);

      ${Reading} {
        color: var(--teal-11);
      }
    `;
  }

  return "";
};

const groupStyle = ($groupPos?: GroupPos | null) => {
  if ($groupPos === "first") {
    return css`
      margin-bottom: 0;
      border-bottom-color: transparent;
      border-radius: var(--radius-3) var(--radius-3) 0 0;
    `;
  }

  if ($groupPos === "middle") {
    return css`
      margin-top: 0;
      margin-bottom: 0;
      border-top-color: transparent;
      border-bottom-color: transparent;
      border-radius: 0;
    `;
  }

  if ($groupPos === "last") {
    return css`
      margin-top: 0;
      border-top-color: transparent;
      border-radius: 0 0 var(--radius-3) var(--radius-3);
    `;
  }

  return "";
};

export const Line = styled.div<{
  $active: boolean;
  $callType?: CallType;
  $groupPos?: GroupPos | null;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  margin: 4px 0;
  padding: 12px 10px;
  border: 1px solid transparent;
  border-radius: var(--radius-3);
  text-align: center;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  ${({ $callType }) => callStyle($callType)}
  ${({ $groupPos }) => groupStyle($groupPos)}

  ${({ $active, $callType }) =>
    $active &&
    css`
      border-color: ${$callType && "var(--red-8)"};
      box-shadow: ${$callType && "var(--shadow-3)"};
      color: var(--red-9);
    `}
`;

export const Japanese = styled.p`
  font-size: 13px;
  line-height: 1.2;
`;

export const Reading = styled.p`
  font-size: 14px;
  line-height: 1.2;
`;

export const Korean = styled.p`
  font-size: 16px;
  font-weight: 700;
  line-height: 1.2;
`;

export const CallGuide = styled(Text)`
  margin-top: 2px;
`;
