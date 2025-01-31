import { adminAtom } from "@atoms/admin.atom";
import { NovelReader } from "@components/NovelReader";
import { PurchaseLink } from "@components/PurchaseLink";
// import { PurchaseLink } from "@components/PurchaseLink";
import { Translate } from "@components/Translate";
import { musics } from "@utils/music";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

export const Novel = () => {
  const { novelId } = useParams();
  const music = musics[Number(novelId) - 1];
  const isAdmin = useRecoilValue(adminAtom);
  if (!music) return null;

  if (music.isPublished && !isAdmin)
    return <PurchaseLink bookId={music.bookId} />;
  if (!music.translated) return <Translate />;
  return <NovelReader music={music} />;
};
