import { Button } from "@mantine/core";
import NavbarLayout from "../../components/NavbarLayout";
import SearchInput from "../../components/search-input";
import { useDebouncedState } from "@mantine/hooks";

const UserList = () => {
  const [value, setValue] = useDebouncedState("", 500);

  return (
    <>
      <NavbarLayout title="User List">
        <SearchInput value={value} setValue={setValue} />
        <Button w={130} bg={"var(--mantine-color-music-7)"}>Create User</Button>
      </NavbarLayout>
    </>
  );
};

export default UserList;
