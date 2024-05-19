import { Box, Flex, Text, Title } from "@mantine/core";
import { ReactNode } from "react";
import LighDark from "./light-dark-btn";

const NavbarLayout = ({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) => {
  return (
    <Box px={10} my={15}>
      <Flex align={"center"} justify={"space-between"}>
        <Flex direction={"column"} gap={4}>
          <Title order={3}>Welcome To Musican Dashboard </Title>
          <Text>{title}</Text>
        </Flex>
        <Flex align={"center"} gap={20} mr={10}>
          {children}
          <LighDark />
        </Flex>
      </Flex>
    </Box>
  );
};

export default NavbarLayout;
