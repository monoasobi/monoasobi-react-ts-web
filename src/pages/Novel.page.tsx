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

const Container = styled.div`
  width: 100%;

  .novelHeader {
    background-color: var(--gray-1);
    box-shadow: 0px 8px 12px -2px var(--black-a1);
  }
`;

export const Novel = () => {
  const { novelId } = useParams();
  const music = musics[Number(novelId) - 1];
  const isAdmin = useRecoilValue(adminAtom);
  if (!music) return null;

  return (
    <Popover.Root>
      <Container>
        <Flex
          className="novelHeader"
          direction="row"
          justify="between"
          px="4"
          py="2"
        >
          <Flex direction="column">
            <Heading size="1">{music.novelWriter}</Heading>
            <Heading size="2">&lt;{music.novelTitle}&gt;</Heading>
          </Flex>
          <Popover.Trigger>
            <IconButton variant="soft">
              <ChevronDownIcon width="16" height="16" />
            </IconButton>
          </Popover.Trigger>
          <Popover.Content maxWidth="320px">
            <Flex direction="column" gap="3">
              <DataList.Root>
                {music.translator && !music.isPublished && (
                  <DataList.Item align="center">
                    <DataList.Label minWidth="60px">역자</DataList.Label>
                    <DataList.Value>
                      <Button asChild>
                        <Link to={music.translatorUrl!} target="_blank">
                          {music.translator}
                        </Link>
                      </Button>
                    </DataList.Value>
                  </DataList.Item>
                )}
                {music.originalNovelUrl && (
                  <DataList.Item align="center">
                    <DataList.Label minWidth="60px">원문</DataList.Label>
                    <DataList.Value>
                      <Button asChild>
                        <Link to={music.originalNovelUrl} target="_blank">
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
        {music.isPublished && !isAdmin ? (
          <PurchaseLink bookId={music.bookId!} />
        ) : !music.translated ? (
          <Translate />
        ) : (
          <NovelReader music={music} />
        )}
      </Container>
    </Popover.Root>
  );
};
