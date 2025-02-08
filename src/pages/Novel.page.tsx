import { adminAtom } from "@atoms/admin.atom";
import { NovelReader } from "@components/NovelReader";
import { PurchaseLink } from "@components/PurchaseLink";

import { Translate } from "@components/Translate";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
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
import { musics } from "@utils/music";
import { Link, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

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
  const music = musics[Number(novelId) - 1];
  const {
    novelTitle,
    novelWriter,
    translated,
    isPublished,
    originalNovelUrl,
    bookId,
    translator,
    translatorUrl,
    CustomComponent,
    korTitle,
    title,
  } = music;
  const isAdmin = useRecoilValue(adminAtom);
  if (!music) return null;

  return (
    <Popover.Root>
      <Container direction="column" align="center">
        <NovelHeader variant="surface">
          <Flex direction="column" align="center">
            <Text size="2" weight="bold" color="red">
              {korTitle} {korTitle !== title && title}
            </Text>
            <Heading size="2">{novelWriter}</Heading>
            {novelTitle && <Heading size="2">&lt;{novelTitle}&gt;</Heading>}
          </Flex>
          <Popover.Trigger className="headerButton">
            <IconButton size="1" variant="soft">
              <EllipsisHorizontalIcon width="16" height="16" />
            </IconButton>
          </Popover.Trigger>
          <Popover.Content maxWidth="320px">
            <Flex direction="column" gap="3">
              <DataList.Root>
                {translator && !isPublished && (
                  <DataList.Item align="center">
                    <DataList.Label minWidth="32px">역자</DataList.Label>
                    <DataList.Value>
                      <Button variant="outline" size="1" asChild>
                        <Link to={translatorUrl!} target="_blank">
                          {translator}
                        </Link>
                      </Button>
                    </DataList.Value>
                  </DataList.Item>
                )}
                {originalNovelUrl && (
                  <DataList.Item align="center">
                    <DataList.Label minWidth="32px">원문</DataList.Label>
                    <DataList.Value>
                      <Button variant="outline" size="1" asChild>
                        <Link to={originalNovelUrl} target="_blank">
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
        {isPublished && !isAdmin ? (
          <PurchaseLink bookId={bookId!} />
        ) : CustomComponent ? (
          <CustomComponent />
        ) : !translated ? (
          <Translate music={music} />
        ) : (
          <NovelReader id={music.id} />
        )}
      </Container>
    </Popover.Root>
  );
};
