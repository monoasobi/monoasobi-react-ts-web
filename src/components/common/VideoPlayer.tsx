import { LyricLine } from "@appTypes/lyric";
import {
  PauseIcon,
  PlayIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/solid";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";

const YOUTUBE_CONFIG = {
  color: "white" as const,
  rel: 0 as const,
  controls: 0,
};

const formatTime = (seconds: number): string => {
  if (!isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const VideoSection = styled.div`
  width: 100%;
  border-radius: var(--radius-4);
  overflow: hidden;
  background-color: #000;
  container-type: inline-size;
`;

const VideoFrame = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
`;

const IframeWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  aspect-ratio: 1 / 1;
  transform: translateY(-21.875%);
`;

const VideoBlocker = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  cursor: pointer;
`;

const VideoGradientOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  height: 42%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.08) 28%,
    rgba(0, 0, 0, 0.38) 70%,
    rgba(0, 0, 0, 0.72) 100%
  );
  pointer-events: none;
`;

const VideoLyricsOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 3;
  padding: 0 16px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  pointer-events: none;
  text-align: center;
`;

const OverlayJp = styled.p`
  font-size: clamp(12px, 1.8cqw, 14px);
  font-style: italic;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.2;
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.9);
`;

const OverlayReading = styled.p`
  font-size: clamp(12px, 1.8cqw, 14px);
  font-style: italic;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.2;
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.9);
`;

const OverlayKr = styled.p`
  font-size: clamp(16px, 3cqw, 22px);
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.9);
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 10px;
  background-color: #111;
`;

const ControlBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border: none;
  background: none;
  color: #e0e0e0;
  cursor: pointer;
  border-radius: var(--radius-2);
  transition: background-color 0.15s;

  svg {
    width: 18px;
    height: 18px;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.12);
  }
`;

const TimeText = styled.span`
  font-size: 11px;
  color: rgba(255, 255, 255, 0.45);
  font-variant-numeric: tabular-nums;
  flex-shrink: 0;
  white-space: nowrap;
  user-select: none;
`;

const SeekInput = styled.input`
  appearance: none;
  flex: 1;
  height: 20px;
  background-color: transparent;
  background-size: 100% 4px;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 999px;
  cursor: pointer;
  outline: none;

  &::-webkit-slider-runnable-track {
    height: 4px;
    border-radius: 999px;
    background: transparent;
  }

  &::-webkit-slider-thumb {
    appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--red-9);
    margin-top: -4px;
  }

  &::-moz-range-track {
    height: 4px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.15);
  }

  &::-moz-range-progress {
    height: 4px;
    border-radius: 999px;
    background: var(--red-9);
  }

  &::-moz-range-thumb {
    width: 12px;
    height: 12px;
    border: none;
    border-radius: 50%;
    background: var(--red-9);
  }
`;

const VolumeWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

const VolumeTooltip = styled.div<{ $show: boolean }>`
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  width: 36px;
  height: 100px;
  padding: 10px 0;
  background: rgba(18, 18, 18, 0.96);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-3);
  box-shadow: var(--shadow-5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  pointer-events: ${({ $show }) => ($show ? "auto" : "none")};
  transition: opacity 0.15s;
  z-index: 10;
`;

const VerticalVolumeInput = styled.input`
  appearance: none;
  width: 76px;
  height: 20px;
  background-color: transparent;
  background-size: 100% 4px;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 999px;
  cursor: pointer;
  outline: none;
  touch-action: none;
  transform: rotate(-90deg);

  &::-webkit-slider-runnable-track {
    height: 4px;
    border-radius: 999px;
    background: transparent;
  }

  &::-webkit-slider-thumb {
    appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--red-9);
    margin-top: -4px;
  }

  &::-moz-range-track {
    height: 4px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.15);
  }

  &::-moz-range-progress {
    height: 4px;
    border-radius: 999px;
    background: var(--red-9);
  }

  &::-moz-range-thumb {
    width: 12px;
    height: 12px;
    border: none;
    border-radius: 50%;
    background: var(--red-9);
  }
`;

export interface VideoPlayerHandle {
  seekAndPlay(time: number): void;
}

export interface VideoPlayerProps {
  youtubeId: string;
  activeLine: LyricLine | null;
  onTimeUpdate: (time: number) => void;
}

export const VideoPlayer = forwardRef<VideoPlayerHandle, VideoPlayerProps>(
  ({ youtubeId, activeLine, onTimeUpdate }, ref) => {
    const playerRef = useRef<HTMLVideoElement | null>(null);
    const volumeWrapperRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [showVolumeTooltip, setShowVolumeTooltip] = useState(false);

    useEffect(() => {
      setCurrentTime(0);
      setIsPlaying(false);
      setDuration(0);
    }, [youtubeId]);

    const setPlayerRef = useCallback((player: HTMLVideoElement | null) => {
      playerRef.current = player;
    }, []);

    useImperativeHandle(ref, () => ({
      seekAndPlay(time: number) {
        const player = playerRef.current;
        if (!player) return;
        player.currentTime = time;
        void player.play?.();
      },
    }));

    const handleTimeUpdate = () => {
      const player = playerRef.current;
      if (!player) return;
      const time = Number(player.currentTime.toFixed(3));
      setCurrentTime(time);
      onTimeUpdate(time);
    };

    const handleDurationChange = () => {
      const player = playerRef.current;
      if (!player) return;
      setDuration(player.duration ?? 0);
    };

    const handleTogglePlay = () => {
      const player = playerRef.current;
      if (!player) return;
      if (isPlaying) {
        void player.pause?.();
      } else {
        void player.play?.();
      }
    };

    const handleSeekChange = (e: ChangeEvent<HTMLInputElement>) => {
      const time = Number(e.target.value);
      const player = playerRef.current;
      if (!player) return;
      player.currentTime = time;
      setCurrentTime(time);
      onTimeUpdate(time);
    };

    const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);
      setVolume(value);
      if (isMuted && value > 0) setIsMuted(false);
    };

    const handleVolumeButtonClick = () => {
      setShowVolumeTooltip((prev) => !prev);
    };

    useEffect(() => {
      if (!showVolumeTooltip) return;
      const handleOutside = (e: MouseEvent | TouchEvent) => {
        if (
          volumeWrapperRef.current &&
          !volumeWrapperRef.current.contains(e.target as Node)
        ) {
          setShowVolumeTooltip(false);
        }
      };
      document.addEventListener("mousedown", handleOutside);
      document.addEventListener("touchstart", handleOutside);
      return () => {
        document.removeEventListener("mousedown", handleOutside);
        document.removeEventListener("touchstart", handleOutside);
      };
    }, [showVolumeTooltip]);

    const seekPct = duration > 0 ? (currentTime / duration) * 100 : 0;
    const volumePct = isMuted ? 0 : volume * 100;

    return (
      <VideoSection>
        <VideoFrame>
          <IframeWrapper>
            <ReactPlayer
              ref={setPlayerRef}
              src={`https://www.youtube.com/watch?v=${youtubeId}`}
              width="100%"
              height="100%"
              volume={volume}
              muted={isMuted}
              config={{ youtube: YOUTUBE_CONFIG }}
              onTimeUpdate={handleTimeUpdate}
              onSeeked={handleTimeUpdate}
              onDurationChange={handleDurationChange}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
            />
          </IframeWrapper>
          <VideoBlocker onClick={handleTogglePlay} />
          <VideoGradientOverlay />
          {activeLine && (
            <VideoLyricsOverlay>
              {activeLine.jp && <OverlayJp>{activeLine.jp}</OverlayJp>}
              {activeLine.jpReading && (
                <OverlayReading>{activeLine.jpReading}</OverlayReading>
              )}
              {activeLine.kr && <OverlayKr>{activeLine.kr}</OverlayKr>}
            </VideoLyricsOverlay>
          )}
        </VideoFrame>
        <Controls>
          <ControlBtn
            type="button"
            onClick={handleTogglePlay}
            aria-label={isPlaying ? "일시정지" : "재생"}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </ControlBtn>
          <TimeText>{formatTime(currentTime)}</TimeText>
          <SeekInput
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={currentTime}
            onChange={handleSeekChange}
            style={{
              backgroundImage: `linear-gradient(to right, var(--red-9) ${seekPct.toFixed(1)}%, rgba(255,255,255,0.15) ${seekPct.toFixed(1)}%)`,
            }}
          />
          <TimeText>{formatTime(duration)}</TimeText>
          <VolumeWrapper ref={volumeWrapperRef}>
            <ControlBtn
              type="button"
              onClick={handleVolumeButtonClick}
              aria-label="볼륨 조절"
            >
              {isMuted || volume === 0 ? (
                <SpeakerXMarkIcon />
              ) : (
                <SpeakerWaveIcon />
              )}
            </ControlBtn>
            <VolumeTooltip $show={showVolumeTooltip}>
              <VerticalVolumeInput
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                style={{
                  backgroundImage: `linear-gradient(to right, var(--red-9) ${volumePct.toFixed(1)}%, rgba(255,255,255,0.15) ${volumePct.toFixed(1)}%)`,
                }}
              />
            </VolumeTooltip>
          </VolumeWrapper>
        </Controls>
      </VideoSection>
    );
  },
);

VideoPlayer.displayName = "VideoPlayer";
