import {
  Button,
  Card,
  DataList,
  Flex,
  Heading,
  ScrollArea,
  Text,
  TextField,
} from "@radix-ui/themes";
import { ChangeEvent, KeyboardEventHandler, useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled(ScrollArea)`
  width: 100%;
  height: calc(100dvh - 56px);

  .rt-ScrollAreaViewport {
    line-height: 160%;
    padding: 24px;
  }

  .card {
    padding: 16px;
    overflow: visible;
  }
`;

const PageFrame = styled(Flex)`
  width: 100%;
  min-height: 100%;
`;

type HoodieType = "특양면" | "기모 오버핏" | "기모 일반핏" | "USA";

interface PricedHoodieItem {
  type: HoodieType;
  size: "M" | "L" | "XL" | "2XL" | "3XL" | "4XL" | "5XL";
  qty: number;
  price: number; // 단일 아이템 가격(개당 가격)
}

export interface PricedOrderRecord {
  name: string; // 본명
  nickname: string; // 닉네임
  phone: string; // 정규화된 연락처
  items: PricedHoodieItem[];
  tracking: string; // 송장번호

  itemPrice: number; // 모든 아이템 가격 합계
  shippingPrice: number; // 배송비
  totalPrice: number; // 총합 (itemPrice + shippingPrice)
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("ko-KR").format(value);

export const Order202512 = () => {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PricedOrderRecord | string | null>(null);
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
        `${import.meta.env.VITE_WORKER_URL}/orders?name=${name}&phone=${phone}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setResult(data);
      } else {
        setResult(await response.text());
      }
    } catch (error) {
      console.log(error);
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
      if (result && typeof result === "object" && "tracking" in result) {
        await navigator.clipboard.writeText(result.tracking);
        setIsCopied(true);
      }
    } catch (error) {
      console.error("클립보드 복사 실패:", error);
    }
  };

  const moveToTracking = () => {
    if (result && typeof result === "object" && "tracking" in result) {
      window.open(
        `https://www.lotteglogis.com/home/reservation/tracking/linkView?InvNo=${result.tracking}`,
        "_blank"
      );
    }
  };

  return (
    <Container scrollbars="vertical">
      <PageFrame direction="column">
        <Card className="card">
        <Flex direction="column" align="center" gap="4">
          <Heading weight="bold" align="center">
            2025년 12월 후드티 공구
          </Heading>
          <Text size="2" weight="bold">
            주문 정보 조회
          </Text>
          <TextField.Root
            placeholder="본명"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyUp={enterHandler}
          />
          <TextField.Root
            placeholder="휴대폰번호"
            value={phone}
            onChange={inputHandler}
            onKeyUp={enterHandler}
          />
          <Button
            onClick={fetchHandler}
            disabled={isLoading || !name || !phone}
          >
            조회
          </Button>
          {result && typeof result == "object" ? (
            <Flex
              direction="column"
              align="stretch"
              gap="4"
              style={{ width: "100%" }}
            >
              <Card variant="surface">
                <Flex direction="column" gap="3">
                  <Heading size="4" weight="bold">
                    주문 정보
                  </Heading>
                  <DataList.Root size="2">
                    <DataList.Item>
                      <DataList.Label>신청자</DataList.Label>
                      <DataList.Value>
                        {result.name} ({result.nickname})
                      </DataList.Value>
                    </DataList.Item>
                    <DataList.Item>
                      <DataList.Label>연락처</DataList.Label>
                      <DataList.Value>{result.phone}</DataList.Value>
                    </DataList.Item>
                    {result.tracking ? (
                      <DataList.Item>
                        <DataList.Label>송장번호</DataList.Label>
                        <DataList.Value>
                          <Flex gap="2" align="center">
                            <Text>롯데택배 {result.tracking}</Text>
                            <Button
                              size="1"
                              variant="soft"
                              onClick={copyToClipboard}
                              disabled={isCopied}
                            >
                              {isCopied ? "복사 완료" : "복사"}
                            </Button>
                            <Button
                              size="1"
                              variant="outline"
                              onClick={moveToTracking}
                              disabled={isCopied}
                            >
                              배송조회
                            </Button>
                          </Flex>
                        </DataList.Value>
                      </DataList.Item>
                    ) : null}
                  </DataList.Root>
                </Flex>
              </Card>

              <Card variant="classic">
                <Flex direction="column" gap="3">
                  <Heading size="3" weight="bold">
                    주문 상품
                  </Heading>
                  <Flex direction="column" gap="2">
                    {result.items.map((item, index) => (
                      <Card
                        key={`${item.type}-${item.size}-${index}`}
                        variant="ghost"
                      >
                        <Flex
                          direction={{ initial: "column", sm: "row" }}
                          justify="between"
                          align={{ initial: "start", sm: "center" }}
                          gap="2"
                        >
                          <Flex direction="column" gap="1">
                            <Text weight="bold">{item.type}</Text>
                            <Text size="2" color="gray">
                              사이즈 {item.size}
                            </Text>
                          </Flex>
                          <Flex gap="3" align="center" wrap="wrap">
                            <Text size="2">수량 {item.qty}개</Text>
                            <Flex direction="column" align="end">
                              <Text size="3" weight="bold">
                                {formatCurrency(item.price * item.qty)}원
                              </Text>
                            </Flex>
                          </Flex>
                        </Flex>
                      </Card>
                    ))}
                  </Flex>
                </Flex>
              </Card>

              <Card>
                <Flex direction="column" gap="3">
                  <Heading size="3" weight="bold">
                    결제 요약
                  </Heading>
                  <DataList.Root size="2">
                    <DataList.Item>
                      <DataList.Label>상품 금액</DataList.Label>
                      <DataList.Value>
                        {formatCurrency(result.itemPrice)}원
                      </DataList.Value>
                    </DataList.Item>
                    <DataList.Item>
                      <DataList.Label>배송비</DataList.Label>
                      <DataList.Value>
                        {formatCurrency(result.shippingPrice)}원
                      </DataList.Value>
                    </DataList.Item>
                    <DataList.Item>
                      <DataList.Label>총 결제 금액</DataList.Label>
                      <DataList.Value>
                        <Text size="4" weight="bold">
                          {formatCurrency(result.totalPrice)}원
                        </Text>
                      </DataList.Value>
                    </DataList.Item>
                  </DataList.Root>
                </Flex>
              </Card>
            </Flex>
          ) : (
            <Text size="2" weight="bold">
              {typeof result === "string" ? result : ""}
            </Text>
          )}
        </Flex>
        </Card>
      </PageFrame>
    </Container>
  );
};
