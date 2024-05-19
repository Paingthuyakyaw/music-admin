import { Container, Flex, Image, Title } from "@mantine/core";
import { ReactNode } from "react";
import logo from "../assets/logo.png";
import LighDark from "./light-dark-btn";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Container size={"xl"}>
      <Flex py={10} justify={"space-between"}>
        <Flex gap={5} align={"center"}>
          <Image
            src={logo}
            style={{ borderRadius: "50%", width: 40, height: 40 }}
          />
          <Title order={3}>Musican</Title>
        </Flex>
        <LighDark />
      </Flex>
      <>{children}</>
    </Container>
  );
};

export default AuthLayout;
