import { adminAtom } from "@atoms/admin.atom";
import { NovelReader } from "@components/NovelReader";
import { PurchaseLink } from "@components/PurchaseLink";
// import { PurchaseLink } from "@components/PurchaseLink";
import { Translate } from "@components/Translate";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  Button,
  DataList,
  Flex,
  Heading,
  IconButton,
  Popover,
} from "@radix-ui/themes";
import { musics } from "@utils/music";
import { Link, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

const Container = styled(Flex)`
  width: 100%;

  .novelHeader {
    width: 100%;
    background-color: var(--gray-1);
    box-shadow: 0px 8px 12px -2px var(--black-a1);
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
  } = music;
  const isAdmin = useRecoilValue(adminAtom);
  if (!music) return null;

  return (
    <Popover.Root>
      <Container direction="column" align="center">
        <Flex
          className="novelHeader"
          direction="row"
          justify="between"
          px="4"
          py="2"
        >
          <Flex direction="column">
            <Heading size="1">{novelWriter}</Heading>
            {novelTitle && <Heading size="2">&lt;{novelTitle}&gt;</Heading>}
          </Flex>
          <Popover.Trigger>
            <IconButton size="1" variant="soft">
              <ChevronDownIcon width="16" height="16" />
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
        </Flex>
        {isPublished && !isAdmin ? (
          <PurchaseLink bookId={bookId!} />
        ) : CustomComponent ? (
          <CustomComponent />
        ) : !translated ? (
          <Translate music={music} />
        ) : (
          <NovelReader music={music} />
        )}
      </Container>
    </Popover.Root>
  );
};
