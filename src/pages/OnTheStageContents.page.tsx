import { ComicReader } from "@components/ComicReader";
import { NovelReader } from "@components/NovelReader";

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
import { onTheStageContents } from "@utils/onTheStage";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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

const Header = styled(Card)`
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

export const OnTheStageContents = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const content = onTheStageContents.find(
    (content) => content.id === Number(id)
  );

  useEffect(() => {
    if (!content) navigate("/404");
  }, [content]);

  if (!content) return;

  const {
    contentId,
    contentTitle,
    contentWriter,
    korTitle,
    originalUrl,
    translator,
    translatorUrl,
    title,
    type,
  } = content;

  return (
    <Popover.Root>
      <Container direction="column" align="center">
        <Header variant="surface">
          <Flex direction="column" align="center">
            <Text size="2" weight="bold" color="red">
              {korTitle} {korTitle !== title && title}
            </Text>
            <Heading size="2">{contentWriter}</Heading>
            <Heading size="2">&lt;{contentTitle}&gt;</Heading>
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
        </Header>
        {type === "novel" ? (
          <NovelReader id={contentId} />
        ) : (
          <ComicReader id={contentId} length={content.length} />
        )}
      </Container>
    </Popover.Root>
  );
};
