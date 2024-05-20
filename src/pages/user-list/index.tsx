import NavbarLayout from "../../components/NavbarLayout";
import SearchInput from "../../components/search-input";
import { useDebouncedState } from "@mantine/hooks";

const UserList = () => {
  const [value, setValue] = useDebouncedState("", 500);

  return (
    <>
      <NavbarLayout title="User List">
        <SearchInput value={value} setValue={setValue} />
      </NavbarLayout>
    </>
  );
};

export default UserList;
