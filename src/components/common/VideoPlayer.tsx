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
import {
  ControlBtn,
  Controls,
  IframeWrapper,
  OverlayJp,
  OverlayKr,
  OverlayReading,
  OverlayToggleBtn,
  SeekInput,
  TimeText,
  VerticalVolumeInput,
  VideoBlocker,
  VideoFrame,
  VideoGradientOverlay,
  VideoLyricsOverlay,
  VideoSection,
  VideoTopControls,
  VolumeTooltip,
  VolumeWrapper,
} from "./VideoPlayer.styles";

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
    const [showJp, setShowJp] = useState(true);
    const [showReading, setShowReading] = useState(false);

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
          <VideoTopControls>
            <OverlayToggleBtn
              type="button"
              $active={showJp}
              onClick={() => setShowJp((prev) => !prev)}
            >
              일어
            </OverlayToggleBtn>
            <OverlayToggleBtn
              type="button"
              $active={showReading}
              onClick={() => setShowReading((prev) => !prev)}
            >
              발음
            </OverlayToggleBtn>
          </VideoTopControls>
          {activeLine && (
            <VideoLyricsOverlay>
              {showJp && activeLine.jp && <OverlayJp>{activeLine.jp}</OverlayJp>}
              {showReading && activeLine.jpReading && (
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
