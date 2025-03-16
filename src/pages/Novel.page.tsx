import { adminAtom } from "@atoms/admin.atom";
import { Loading } from "@components/Loading";
import { PurchaseLink } from "@components/PurchaseLink";
import { Translate } from "@components/Translate";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { musics } from "@lib/music";
import { novels } from "@lib/novel";
import {
  Button,
  Card,
  DataList,
  Flex,
  Heading,
  IconButton,
  Popover,
  Text,
} from "@radix-ui/themes";
import { lazy, Suspense, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

const Reader = lazy(() =>
  import("@components/NovelReader").then(({ NovelReader }) => ({
    default: NovelReader,
  }))
);

const Container = styled(Flex)`
  width: 100%;
  padding: 8px;
  position: relative;

  .headerButton {
    position: absolute;
    right: 16px;
  }
`;

const NovelHeader = styled(Card)`
  position: absolute;
  top: 0;
  display: flex;
  width: 95%;
  background-color: var(--gray-1);
  box-shadow: 0px 6px 8px -2px var(--black-a1);
  justify-content: center;
  align-items: center;
  padding: 8px 8px;
  z-index: 1;

  visibility: visible;
  &.notVisible {
    visibility: hidden;
  }
`;

export const Novel = () => {
  const { novelId } = useParams();
  const navigate = useNavigate();
  const music = musics.find((music) => music.id === Number(novelId));
  const novel = novels.find((novel) => novel.id === Number(novelId));
  useEffect(() => {
    if (!music || !novel) navigate("/404");
  }, [music, navigate, novel]);

  const isAdmin = useRecoilValue(adminAtom);
  if (!music || !novel) return;

  const { CustomComponent, korTitle, title } = music;

  if (CustomComponent) return <CustomComponent />;

  return (
    <Popover.Root>
      <Container direction="column" align="center">
        <NovelHeader variant="surface">
          <Flex direction="column" align="center">
            <Text size="2" weight="bold" color="red">
              {korTitle} {korTitle !== title && title}
            </Text>
            <Heading size="2">{novel.writer}</Heading>
            {novel.title && <Heading size="2">&lt;{novel.title}&gt;</Heading>}
          </Flex>
          <Popover.Trigger className="headerButton">
            <IconButton size="1" variant="soft">
              <EllipsisHorizontalIcon width="16" height="16" />
            </IconButton>
          </Popover.Trigger>
          <Popover.Content maxWidth="320px">
            <Flex direction="column" gap="3">
              <DataList.Root>
                {novel.translated && !novel.isPublished && (
                  <DataList.Item align="center">
                    <DataList.Label minWidth="32px">역자</DataList.Label>
                    <DataList.Value>
                      <Button variant="outline" size="1" asChild>
                        <Link to={novel.translatorUrl!} target="_blank">
                          {novel.translator}
                        </Link>
                      </Button>
                    </DataList.Value>
                  </DataList.Item>
                )}
                {novel.originNovelUrl && (
                  <DataList.Item align="center">
                    <DataList.Label minWidth="32px">원문</DataList.Label>
                    <DataList.Value>
                      <Button variant="outline" size="1" asChild>
                        <Link to={novel.originNovelUrl} target="_blank">
                          보러가기
                        </Link>
                      </Button>
                    </DataList.Value>
                  </DataList.Item>
                )}
              </DataList.Root>
            </Flex>
          </Popover.Content>
        </NovelHeader>
        {novel.isPublished && !isAdmin ? (
          <PurchaseLink bookId={novel.bookId} />
        ) : !novel.translated ? (
          <Translate music={music} />
        ) : (
          <Suspense fallback={<Loading />}>
            <Reader id={novel.id} />
          </Suspense>
        )}
      </Container>
    </Popover.Root>
  );
};
