import yoasobi from "@assets/yoasobi.jpg";
import { adminAtom } from "@atoms/admin.atom";
import { Loading } from "@components/Loading";
import { WrenchIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Card,
  Dialog,
  Flex,
  Heading,
  IconButton,
  Text,
  TextField,
} from "@radix-ui/themes";
import { KeyboardEventHandler, useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

const Container = styled(Flex)`
  width: 100%;
  height: calc(100dvh - 56px);
  overflow: auto;
  line-height: 160%;
  padding: 24px;

  .card {
    padding: 16px;
  }

  .yoasobi {
    width: 100%;
    max-width: 360px;
  }

  .desc {
    width: 90%;
    max-width: 480px;
  }

  .admin {
    margin-top: 16px;
    opacity: 0;
    align-self: flex-end;
    transition: opacity 0.7s ease-in-out;
    &:hover {
      opacity: 1;
    }
  }
`;

const DialogContent = styled(Dialog.Content)`
  .dialog {
    position: relative;

    > .loading {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.6);
    }
  }
`;

export const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [pw, setPw] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const setIsAdmin = useSetRecoilState(adminAtom);

  const adminHandler = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${import.meta.env.VITE_EF_URL}/admin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pw }),
      });
      if (response.ok) {
        setIsAdmin(true);
        setIsOpen(false);
      } else {
        setIsAdmin(false);
        alert("비밀번호가 틀렸습니다.");
      }
    } catch (error) {
      setIsAdmin(false);
      alert("관리자 인증 오류입니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const enterHandler: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") return adminHandler();
  };
  return (
    <Container direction="column">
      <Card className="card">
        <Flex direction="column" align="center" gap="4">
          <img className="yoasobi" src={yoasobi} alt="yoasobi" />
          <Heading size="6">Novel into Music</Heading>
          <Heading size="4" color="red">
            MONOASOBI
          </Heading>
          <Flex direction="column" gap="4" className="desc">
            <Text size="2">
              모노아소비는 요아소비 음악의 소설 원작 번역본을 수집한
              사이트입니다.
            </Text>
            <Text size="2">
              제공되는 모든 소설 원작과 번역본은 작가 / 번역자에게 저작권이
              있으며, 모노아소비는 이 사이트를 통해 영리적인 취득을 하지
              않습니다.
            </Text>
            <Text size="2">
              번역 및 기타 문의 :{" "}
              <a href="mailto:envi.9.offcial@gmail.com?subject=모노아소비 문의">
                envi.9.offcial@gmail.com
              </a>
            </Text>
          </Flex>
        </Flex>
      </Card>
      <Dialog.Root open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <Dialog.Trigger>
          <IconButton className="admin" variant="outline" color="gray">
            <WrenchIcon width={16} />
          </IconButton>
        </Dialog.Trigger>

        <DialogContent>
          <Flex className="dialog" direction="column" gap="2">
            <Dialog.Title>관리자 접속</Dialog.Title>
            <label>
              <Text as="div" size="1" mb="1" weight="light">
                관리자 비밀번호
              </Text>
              <TextField.Root
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                onKeyUp={enterHandler}
                type="password"
                placeholder="관리자 비밀번호"
              />
            </label>
            <Button onClick={adminHandler}>확인</Button>
            {isLoading && (
              <div className="loading">
                <Loading />
              </div>
            )}
          </Flex>
        </DialogContent>
      </Dialog.Root>
    </Container>
  );
};
