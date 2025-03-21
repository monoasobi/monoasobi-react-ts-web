import { HeartBeat as HeartBeatComponent } from "@components/custom/HeartBeat";
import { ContentsContainer } from "@components/layout/ContentsContainer";
import { musics } from "@lib/music";
import { novels } from "@lib/novel";

export const HeartBeat = () => {
  const music = musics[24];
  const novel = novels.find((novel) => novel.musicId === music.id);
  return (
    <ContentsContainer music={music} content={novel!}>
      <HeartBeatComponent />
    </ContentsContainer>
  );
};
