import { Players as PlayersComponent } from "@components/custom/Players";
import { ContentsContainer } from "@components/layout/ContentsContainer";
import { musics } from "@lib/music";
import { novels } from "@lib/novel";

export const Players = () => {
  const music = musics[29];
  const novel = novels.find((novel) => novel.musicId === music.id);
  return (
    <ContentsContainer music={music} content={novel!}>
      <PlayersComponent />
    </ContentsContainer>
  );
};
