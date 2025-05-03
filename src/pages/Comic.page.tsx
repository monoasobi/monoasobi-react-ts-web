import { ContentsContainer } from "@components/layout/ContentsContainer";
import { Loading } from "@components/Loading";
import { comics } from "@lib/comic";
import { musics } from "@lib/music";
import { lazy, Suspense, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ComicReader = lazy(() =>
  import("@components/ComicReader").then(({ ComicReader }) => ({
    default: ComicReader,
  }))
);

export const Comic = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const comic = comics.find((comic) => comic.id === Number(id));
  const music = musics.find((music) => music.id === comic?.musicId);

  useEffect(() => {
    if (!comic || !music) navigate("/404");
  }, [comic, music, navigate]);

  if (!comic || !music) return;

  return (
    <ContentsContainer music={music} content={comic}>
      <Suspense fallback={<Loading />}>
        <ComicReader id={comic.id} />
      </Suspense>
    </ContentsContainer>
  );
};
