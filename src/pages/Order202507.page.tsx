import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import {
  Badge,
  Button,
  Card,
  Flex,
  Heading,
  Text,
  TextField,
} from "@radix-ui/themes";
import { ChangeEvent, KeyboardEventHandler, useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
`;

export const Order202507 = () => {
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string>("");
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  }, [isCopied]);

  const fetchHandler = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_WORKER_URL}/order202507`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone }),
        }
      );

      const data = await response.json();
      setResult(data.data);
    } catch (error) {
      console.log(error);

      setResult("조회 중 서버 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setPhone(value);
  };
  const enterHandler: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") return fetchHandler();
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setIsCopied(true);
    } catch (error) {
      console.error("클립보드 복사 실패:", error);
    }
  };

  return (
    <Container direction="column">
      <Card className="card">
        <Flex direction="column" align="center" gap="4">
          <Heading weight="bold" align="center">
            2025년 7월 티셔츠 공구
          </Heading>
          <Text size="2" weight="bold">
            운송장 번호 조회
          </Text>
          <TextField.Root
            placeholder="휴대폰번호"
            value={phone}
            onChange={inputHandler}
            onKeyUp={enterHandler}
          />
          <Button onClick={fetchHandler} disabled={isLoading}>
            조회
          </Button>
          {result &&
            (!isNaN(Number(result)) ? (
              <Flex direction="column" align="center" gap="2">
                <Heading size="4" weight="bold">
                  운송장 번호
                </Heading>
                <Button size="1" asChild onClick={copyToClipboard}>
                  <Badge size="3">
                    롯데택배 {result} <ClipboardDocumentIcon width={14} />
                  </Badge>
                </Button>
                {isCopied && (
                  <Text size="1" color="gray">
                    복사됨
                  </Text>
                )}
                <Button size="2" variant="outline" asChild>
                  <Link
                    to={`https://www.lotteglogis.com/home/reservation/tracking/linkView?InvNo=${result}`}
                    target="_blank"
                  >
                    택배 조회
                  </Link>
                </Button>
              </Flex>
            ) : (
              <Text size="2" weight="bold">
                조회 결과가 없습니다.
              </Text>
            ))}
        </Flex>
      </Card>
    </Container>
  );
};
