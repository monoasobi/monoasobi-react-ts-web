import { CallType, LyricLine } from "@appTypes/lyric";
import { HandRaisedIcon, MicrophoneIcon } from "@heroicons/react/24/solid";
import { Badge, Button } from "@radix-ui/themes";
import { useMemo, useRef } from "react";
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
  ScrollWrapper,
  type GroupPos,
} from "./LyricsDisplayV2.styles";

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

export interface LyricsDisplayV2Props {
  lyrics: LyricLine[];
  currentTime: number;
  offset: number;
  onSeek: (time: number) => void;
}

export const LyricsDisplayV2 = ({
  lyrics,
  currentTime,
  offset,
  onSeek,
}: LyricsDisplayV2Props) => {
  const adjustedTime = currentTime + offset;
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

  const handleJump = (time: number, index: number) => {
    onSeek(time - offset);
    lineRefs.current
      .get(index)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <Container direction="column" gap="2" flexGrow="1">
      <Header align="center" gap="2">
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
      </Header>

      <ScrollWrapper>
        <Scroll>
          {lyrics.map((line, index) => {
            const isActive = index === activeIndex;
            const groupPos = getGroupPos(lyrics, index);
            const isGroupStart = groupPos === "solo" || groupPos === "first";

            return (
              <Line
                key={`${line.start}-${index}`}
                ref={(element) => {
                  if (element) {
                    lineRefs.current.set(index, element);
                  } else {
                    lineRefs.current.delete(index);
                  }
                }}
                $active={isActive}
                $callType={line.callType}
                $groupPos={groupPos}
                onClick={() => onSeek(line.start - offset)}
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
