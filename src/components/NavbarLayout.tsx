import { ActionIcon, Box, Flex, Text, Title } from "@mantine/core";
import { ReactNode } from "react";
import LighDark from "./light-dark-btn";
import { IconCheck, IconLogout } from "@tabler/icons-react";
import { logout } from "../api/axios";
import { useAuthStore } from "../store/client/useStore";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";

const NavbarLayout = ({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) => {
  const { resetToken } = useAuthStore();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logout();
    resetToken();
    navigate("/login");
    return notifications.show({
      message: "Logout Successfully",
      icon: <IconCheck />,
      color: "green",
    });
  };

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
          <ActionIcon onClick={handleLogOut} variant="light">
            <IconLogout size={18} />
          </ActionIcon>
        </Flex>
      </Flex>
    </Box>
  );
};

export default NavbarLayout;
