import { ActionIcon, Flex, Menu, MenuDropdown } from "@mantine/core";
import { IconDotsVertical } from "@tabler/icons-react";
import { ReactNode } from "react";

const ActionButton = ({ children }: { children: ReactNode }) => {
  return (
    <Menu>
      <Menu.Target>
       <Flex>
         <ActionIcon color="var(--mantine-color-music-7)" variant="light" >
          <IconDotsVertical size={20} />
        </ActionIcon>
       </Flex>
      </Menu.Target>
      <MenuDropdown style={{zIndex : 55}} >{children}</MenuDropdown>
    </Menu>
  );
};

export default ActionButton;
