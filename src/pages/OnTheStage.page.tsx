import { OnTheStage as OnTheStageComponent } from "@components/custom/OnTheStage";
import { ContentsContainer } from "@components/layout/ContentsContainer";
import { musics } from "@lib/music";

export const OnTheStage = () => {
  const music = musics[26];
  return (
    <ContentsContainer music={music}>
      <OnTheStageComponent />
    </ContentsContainer>
  );
};
