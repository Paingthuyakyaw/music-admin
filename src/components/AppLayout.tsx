import { Navigate, Outlet } from "react-router-dom";
import SliderNav from "./slide-nav";
import { Box, Flex } from "@mantine/core";
import { useAuthStore } from "../store/client/useStore";

const AppLayout = () => {
  const { token } = useAuthStore();

  if (!token) return <Navigate to={"/login"} />;

  return (
    <Box>
      <Flex gap={20}>
        <SliderNav />
        <Box w={'100%'} >
          <Outlet />
        </Box>
      </Flex>
    </Box>
  );
};

export default AppLayout;
