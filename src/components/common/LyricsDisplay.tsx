import { CallType, LyricLine } from "@appTypes/lyric";
import { HandRaisedIcon, MicrophoneIcon } from "@heroicons/react/24/solid";
import { Badge, Button, Flex, Switch, Text } from "@radix-ui/themes";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  CallGuide,
  Container,
  Header,
  Icon,
  Japanese,
  JumpButtons,
  Korean,
  Line,
  Reading,
  Scroll,
  ScrollBlocker,
  ScrollTooltip,
  ScrollWrapper,
  Tooltip,
  TooltipWrapper,
  type GroupPos,
} from "./LyricsDisplay.styles";

const TOOLTIP_LS_KEY = "monoasobi-lyrics-auto-scroll-tooltip";
const SCROLL_TOOLTIP_LS_KEY = "monoasobi-lyrics-scroll-tooltip";

const TYPE_LABELS: Record<CallType, string> = {
  LOUD: "떼창",
  CLAP: "박수",
  CUSTOM: "콜",
};

const getGroupPos = (lines: LyricLine[], index: number): GroupPos | null => {
  const callType = lines[index].callType;
  if (!callType) return null;

  const prevSame = index > 0 && lines[index - 1].callType === callType;
  const nextSame =
    index < lines.length - 1 && lines[index + 1].callType === callType;

  if (!prevSame && !nextSame) return "solo";
  if (!prevSame && nextSame) return "first";
  if (prevSame && nextSame) return "middle";
  return "last";
};

const getStoredFlag = (key: string) => {
  try {
    return localStorage.getItem(key) === "1";
  } catch {
    return false;
  }
};

const setStoredFlag = (key: string) => {
  try {
    localStorage.setItem(key, "1");
  } catch {
    // localStorage can be unavailable in private contexts.
  }
};

export interface LyricsDisplayProps {
  lyrics: LyricLine[];
  currentTime: number;
  offset: number;
  onSeek: (time: number) => void;
}

export const LyricsDisplay = ({
  lyrics,
  currentTime,
  offset,
  onSeek,
}: LyricsDisplayProps) => {
  const adjustedTime = currentTime + offset;
  const [autoScroll, setAutoScroll] = useState(true);
  const [showTooltip, setShowTooltip] = useState(
    () => !getStoredFlag(TOOLTIP_LS_KEY),
  );
  const [showScrollTooltip, setShowScrollTooltip] = useState(false);
  const scrollTooltipDismissed = useRef(getStoredFlag(SCROLL_TOOLTIP_LS_KEY));
  const activeRef = useRef<HTMLDivElement | null>(null);
  const lineRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const activeIndex = useMemo(
    () =>
      lyrics.findIndex(
        (line) => adjustedTime >= line.start && adjustedTime < line.end,
      ),
    [adjustedTime, lyrics],
  );

  const callGroupStarts = useMemo(
    () =>
      lyrics.flatMap((line, index) => {
        if (!line.callType) return [];

        const groupPos = getGroupPos(lyrics, index);
        if (groupPos !== "first" && groupPos !== "solo") return [];

        return [
          {
            index,
            startTime: line.start,
            type: line.callType,
            label: line.callGuide || TYPE_LABELS[line.callType],
          },
        ];
      }),
    [lyrics],
  );

  useEffect(() => {
    if (!autoScroll || activeIndex < 0 || !activeRef.current) return;
    activeRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [activeIndex, autoScroll]);

  const handleAutoScrollChange = (checked: boolean) => {
    setAutoScroll(checked);
    setStoredFlag(TOOLTIP_LS_KEY);
    setShowTooltip(false);

    if (!checked && !scrollTooltipDismissed.current) {
      setShowScrollTooltip(true);
    }
  };

  const handleDismissScrollTooltip = () => {
    setStoredFlag(SCROLL_TOOLTIP_LS_KEY);
    scrollTooltipDismissed.current = true;
    setShowScrollTooltip(false);
  };

  const handleJump = (time: number, index: number) => {
    onSeek(time - offset);
    lineRefs.current
      .get(index)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <Container direction="column" gap="2" flexGrow="1">
      <Header align="center" justify="between" gap="2">
        <JumpButtons align="center" gap="1">
          {callGroupStarts.map((group, index) => (
            <Button
              key={`${group.type}-${group.startTime}-${index}`}
              type="button"
              size="1"
              variant="soft"
              color={group.type === "CLAP" ? "amber" : "red"}
              onClick={() => handleJump(group.startTime, group.index)}
            >
              <Icon>
                {group.type === "CLAP" ? (
                  <HandRaisedIcon />
                ) : (
                  <MicrophoneIcon />
                )}
              </Icon>
              {group.label} {index + 1}
            </Button>
          ))}
        </JumpButtons>
        <TooltipWrapper>
          <Flex asChild align="center" gap="2">
            <label>
              <Text size="1" weight="bold">
                자동 스크롤
              </Text>
              <Switch
                size="1"
                checked={autoScroll}
                onCheckedChange={handleAutoScrollChange}
              />
            </label>
          </Flex>
          {showTooltip && (
            <Tooltip
              role="button"
              tabIndex={0}
              onClick={() => {
                setStoredFlag(TOOLTIP_LS_KEY);
                setShowTooltip(false);
              }}
            >
              자동 스크롤을 끄면 가사를 눌러 원하는 부분으로 이동할 수 있어요.
            </Tooltip>
          )}
        </TooltipWrapper>
      </Header>

      <ScrollWrapper>
        {autoScroll && <ScrollBlocker />}
        {showScrollTooltip && (
          <ScrollTooltip
            role="button"
            tabIndex={0}
            onClick={handleDismissScrollTooltip}
          >
            가사를 스크롤하거나 눌러서 원하는 부분을 바로 재생할 수 있어요.
          </ScrollTooltip>
        )}
        <Scroll>
          {lyrics.map((line, index) => {
            const isActive = index === activeIndex;
            const groupPos = getGroupPos(lyrics, index);
            const isGroupStart = groupPos === "solo" || groupPos === "first";

            return (
              <Line
                key={`${line.start}-${index}`}
                ref={(element) => {
                  if (isActive) activeRef.current = element;
                  if (element) {
                    lineRefs.current.set(index, element);
                  } else {
                    lineRefs.current.delete(index);
                  }
                }}
                $active={isActive}
                $clickable={!autoScroll}
                $callType={line.callType}
                $groupPos={groupPos}
                onClick={!autoScroll ? () => onSeek(line.start - offset) : undefined}
              >
                {line.callType && (isActive || isGroupStart) && (
                  <Badge color={line.callType === "CLAP" ? "amber" : "red"}>
                    {line.callGuide || TYPE_LABELS[line.callType]}
                  </Badge>
                )}
                <Japanese>{line.jp}</Japanese>
                <Reading>{line.jpReading}</Reading>
                <Korean>{line.kr}</Korean>
                {line.callGuide && line.callType === "CUSTOM" && (
                  <CallGuide as="p" size="1" color="gray">
                    {line.callGuide}
                  </CallGuide>
                )}
              </Line>
            );
          })}
        </Scroll>
      </ScrollWrapper>
    </Container>
  );
};
