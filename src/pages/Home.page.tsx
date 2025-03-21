import logo from "@assets/logo.svg";
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
    overflow: visible;
  }

  .yoasobi {
    width: 90%;
    max-width: 960px;
  }

  .logo {
    width: 240px;
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
      console.log(error);
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
          <Flex direction="column" align="center" gap="2">
            <Heading size="6" color="red">
              𝘕𝘰𝘷𝘦𝘭 𝘪𝘯𝘵𝘰 𝘔𝘶𝘴𝘪𝘤,
            </Heading>
            <img src={logo} alt="logo" className="logo" />
          </Flex>

          <Flex direction="column" gap="4" className="desc">
            <Text size="2">
              모노아소비는 요아소비(YOASOBI)의 음악이 원작으로 삼고 있는 소설과
              그 번역본을 한곳에 모아 제공하는 사이트입니다.
            </Text>
            <Text size="2">
              요아소비의 음악은 감상을 넘어, 원작이 되는 소설을 함께 읽으면
              음악이 담고 있는 이야기와 감정을 더욱 깊이 이해할 수 있습니다.
              (경험담임)
            </Text>
            <Text size="2">
              모노아소비는 더 많은 사람들이 이 원작 소설을 즐길 수 있도록 돕고,
              요아소비의 음악을 더욱 깊이 음미하고 사랑하게 되기를 바라는
              마음으로 운영됩니다.
            </Text>
            <Text size="2">
              사이트에 게시된 모든 원작 소설과 번역본의 저작권은 각각의 작가와
              번역자에게 있으며, 모노아소비는 이 자료들을 공유함으로써 어떠한
              상업적 이익도 추구하지 않습니다.
            </Text>
            <Text size="2" align="center">
              번역 투고 및 기타 문의 :{" "}
              <a href="mailto:envi.9.official@gmail.com?subject=모노아소비 문의">
                envi.9.official@gmail.com
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
