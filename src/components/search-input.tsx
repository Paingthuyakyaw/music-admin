import { Input } from "@mantine/core";

interface InputProp {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const SearchInput = ({ value, setValue }: InputProp) => {
  return (
    <>
      <Input
        defaultValue={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        w={300}
        radius={"xl"}
        variant="filled"
        rightSectionPointerEvents="all"
        placeholder="Search..."
      />
    </>
  );
};

export default SearchInput;
