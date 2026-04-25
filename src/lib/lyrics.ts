import { LyricTrack } from "@appTypes/lyric";

const lyricModules = import.meta.glob<LyricTrack>("./lyrics/*.json", {
  import: "default",
});

export const loadLyricTrack = async (
  musicId: number,
): Promise<LyricTrack | null> => {
  const loadTrack = lyricModules[`./lyrics/${musicId}.json`];
  if (!loadTrack) return null;

  return loadTrack();
};
