import { LyricTrack } from "@appTypes/lyric";
import { Music } from "@appTypes/music";
import { LyricsDisplayV2 } from "@components/common/LyricsDisplayV2";
import { loadLyricTrack } from "@lib/lyrics";
import { Button, Card, Flex, Heading, Popover, Text } from "@radix-ui/themes";
import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { VideoPlayer, type VideoPlayerHandle } from "./VideoPlayer";

const OFFSET_STEPS = [0.01, 0.05, 0.1, 0.5];

const Container = styled(Flex)`
  width: 100%;
  height: calc(100dvh - 72px);
  overflow: auto;
  padding: 92px 24px 24px;
`;

const InnerContainer = styled(Flex)`
  width: 100%;
`;

const StatusCard = styled(Card)`
  background-color: var(--gray-2);
`;

const SyncValue = styled(Text)`
  font-variant-numeric: tabular-nums;
`;

export interface YouTubeLyricsPlayerProps {
  music: Music;
}

export const YouTubeLyricsPlayer = ({ music }: YouTubeLyricsPlayerProps) => {
  const videoPlayerRef = useRef<VideoPlayerHandle>(null);
  const [track, setTrack] = useState<LyricTrack | null>(null);
  const [isLoadingTrack, setIsLoadingTrack] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [lyricsOffset, setLyricsOffset] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    let ignore = false;

    setIsLoadingTrack(true);
    setLoadError(false);
    setTrack(null);
    setLyricsOffset(0);
    setCurrentTime(0);

    loadLyricTrack(music.id)
      .then((nextTrack) => {
        if (ignore) return;

        setTrack(nextTrack);
        setLyricsOffset(nextTrack?.sync ?? 0);
      })
      .catch(() => {
        if (ignore) return;
        setLoadError(true);
      })
      .finally(() => {
        if (!ignore) setIsLoadingTrack(false);
      });

    return () => {
      ignore = true;
    };
  }, [music.id]);

  const adjustedTime = currentTime + lyricsOffset;

  const activeLine = useMemo(
    () =>
      track?.lyric.find(
        (line) => adjustedTime >= line.start && adjustedTime < line.end,
      ) ?? null,
    [adjustedTime, track],
  );

  const handleSeek = (time: number) => {
    setCurrentTime(time);
    videoPlayerRef.current?.seekAndPlay(time);
  };

  const handleOffsetChange = (delta: number) => {
    setLyricsOffset((prev) => Number((prev + delta).toFixed(2)));
  };

  const resetOffset = () => {
    setLyricsOffset(track?.sync ?? 0);
  };

  const syncLabel =
    lyricsOffset !== 0
      ? `sync ${lyricsOffset >= 0 ? "+" : ""}${lyricsOffset.toFixed(2)}`
      : "sync";

  return (
    <Container direction="column" gap="3">
      <InnerContainer direction="column" gap="3">
        <Flex direction="column" gap="3">
          <Flex align="start" justify="between" gap="3">
            <Flex direction="row" align="end" gap="1" wrap="wrap">
              <Heading size="4">{music.title}</Heading>
              <Text size="2" color="gray">
                {music.korTitle}
              </Text>
            </Flex>

            {import.meta.env.DEV && (
              <Popover.Root>
                <Popover.Trigger>
                  <Button size="1" variant="soft" color="gray">
                    {syncLabel}
                  </Button>
                </Popover.Trigger>
                <Popover.Content width="260px">
                  <Flex direction="column" gap="3">
                    <Flex align="center" justify="between">
                      <Text size="2" weight="bold">
                        가사 sync
                      </Text>
                      <SyncValue size="2" color="gray">
                        {lyricsOffset >= 0 ? "+" : ""}
                        {lyricsOffset.toFixed(2)}s
                      </SyncValue>
                    </Flex>
                    <Flex gap="1" wrap="wrap">
                      {OFFSET_STEPS.map((step) => (
                        <Button
                          key={`minus-${step}`}
                          type="button"
                          size="1"
                          variant="outline"
                          color="gray"
                          onClick={() => handleOffsetChange(-step)}
                        >
                          -{step}
                        </Button>
                      ))}
                    </Flex>
                    <Flex gap="1" wrap="wrap">
                      {OFFSET_STEPS.map((step) => (
                        <Button
                          key={`plus-${step}`}
                          type="button"
                          size="1"
                          variant="outline"
                          color="gray"
                          onClick={() => handleOffsetChange(step)}
                        >
                          +{step}
                        </Button>
                      ))}
                    </Flex>
                    <Button
                      type="button"
                      size="1"
                      variant="soft"
                      color="red"
                      onClick={resetOffset}
                    >
                      reset
                    </Button>
                  </Flex>
                </Popover.Content>
              </Popover.Root>
            )}
          </Flex>

          {music.youtubeId ? (
            <VideoPlayer
              ref={videoPlayerRef}
              youtubeId={music.youtubeId}
              activeLine={activeLine}
              onTimeUpdate={setCurrentTime}
            />
          ) : (
            <StatusCard>
              <Text size="2" color="gray">
                등록된 YouTube 영상이 없습니다.
              </Text>
            </StatusCard>
          )}
        </Flex>
      </InnerContainer>

      {isLoadingTrack && (
        <StatusCard>
          <Text size="2" color="gray">
            가사 파일을 불러오는 중입니다.
          </Text>
        </StatusCard>
      )}

      {loadError && (
        <StatusCard>
          <Text size="2" color="red">
            가사 파일을 불러오지 못했습니다.
          </Text>
        </StatusCard>
      )}

      {!isLoadingTrack && !loadError && track && (
        <LyricsDisplayV2
          lyrics={track.lyric}
          currentTime={currentTime}
          offset={lyricsOffset}
          onSeek={handleSeek}
        />
      )}

      {!isLoadingTrack && !loadError && !track && (
        <StatusCard>
          <Text size="2" color="gray">
            이 곡의 가사 파일은 아직 준비되지 않았습니다.
          </Text>
        </StatusCard>
      )}
    </Container>
  );
};
