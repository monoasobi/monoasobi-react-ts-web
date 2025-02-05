import { ComicReader } from "@components/ComicReader";

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
import { comics } from "@utils/comic";
import { Link, useParams } from "react-router-dom";
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

const ComicHeader = styled(Card)`
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

export const Comic = () => {
  const { comicId } = useParams();
  const comic = comics[Number(comicId) - 1];
  const {
    comicTitle,
    comicWriter,
    korTitle,
    originalUrl,
    translator,
    translatorUrl,
    title,
  } = comic;
  if (!comic) return null;

  return (
    <Popover.Root>
      <Container direction="column" align="center">
        <ComicHeader variant="surface">
          <Flex direction="column" align="center">
            <Text size="2" weight="bold" color="red">
              {korTitle} {korTitle !== title && title}
            </Text>
            <Heading size="2">{comicWriter}</Heading>
            {comicTitle && <Heading size="2">&lt;{comicTitle}&gt;</Heading>}
          </Flex>
          <Popover.Trigger className="headerButton">
            <IconButton size="1" variant="soft">
              <EllipsisHorizontalIcon width="16" height="16" />
            </IconButton>
          </Popover.Trigger>
          <Popover.Content maxWidth="320px">
            <Flex direction="column" gap="3">
              <DataList.Root>
                {translator && (
                  <DataList.Item align="center">
                    <DataList.Label minWidth="32px">역식자</DataList.Label>
                    <DataList.Value>
                      <Button variant="outline" size="1" asChild>
                        <Link to={translatorUrl!} target="_blank">
                          {translator}
                        </Link>
                      </Button>
                    </DataList.Value>
                  </DataList.Item>
                )}
                {originalUrl && (
                  <DataList.Item align="center">
                    <DataList.Label minWidth="32px">원문</DataList.Label>
                    <DataList.Value>
                      <Button variant="outline" size="1" asChild>
                        <Link to={originalUrl} target="_blank">
                          보러가기
                        </Link>
                      </Button>
                    </DataList.Value>
                  </DataList.Item>
                )}
              </DataList.Root>
            </Flex>
          </Popover.Content>
        </ComicHeader>

        <ComicReader comic={comic} />
      </Container>
    </Popover.Root>
  );
};
