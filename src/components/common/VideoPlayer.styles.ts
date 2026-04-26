import styled, { css } from "styled-components";

export const VideoSection = styled.div`
  width: 100%;
  border-radius: var(--radius-4);
  overflow: hidden;
  background-color: #000;
  container-type: inline-size;
`;

export const VideoFrame = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
`;

export const IframeWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  aspect-ratio: 1 / 1;
  transform: translateY(-21.875%);
`;

export const VideoBlocker = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  cursor: pointer;
`;

export const VideoGradientOverlay = styled.div`
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

export const VideoTopControls = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 4;
  display: flex;
  gap: 4px;
  pointer-events: auto;
`;

export const OverlayToggleBtn = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(0, 0, 0, 0.5);
  color: rgba(255, 255, 255, 0.5);
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.15s,
    color 0.15s,
    border-color 0.15s;

  ${({ $active }) =>
    $active &&
    css`
      background: rgba(var(--red-9), 0.18);
      border-color: rgba(var(--red-9), 0.6);
      color: var(--red-9);
    `}
`;

export const VideoLyricsOverlay = styled.div`
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

export const OverlayJp = styled.p`
  font-size: clamp(12px, 1.8cqw, 14px);
  font-style: italic;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.2;
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.9);
`;

export const OverlayReading = styled.p`
  font-size: clamp(12px, 1.8cqw, 14px);
  font-style: italic;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.2;
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.9);
`;

export const OverlayKr = styled.p`
  font-size: clamp(16px, 3cqw, 22px);
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.9);
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 10px;
  background-color: #111;
`;

export const ControlBtn = styled.button`
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

export const TimeText = styled.span`
  font-size: 11px;
  color: rgba(255, 255, 255, 0.45);
  font-variant-numeric: tabular-nums;
  flex-shrink: 0;
  white-space: nowrap;
  user-select: none;
`;

export const SeekInput = styled.input`
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

export const VolumeWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

export const VolumeTooltip = styled.div<{ $show: boolean }>`
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

export const VerticalVolumeInput = styled.input`
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
