import NavbarLayout from "../../components/NavbarLayout";
import SearchInput from "../../components/search-input";
import { useDebouncedState } from "@mantine/hooks";
import { useUserList } from "../../store/server/user-list/query";
import { useState } from "react";
import { DataTable } from "mantine-datatable";
import dayjs from "dayjs";
import { Box } from "@mantine/core";

const UserList = () => {
  const [value, setValue] = useDebouncedState("", 500);

  const [page, setPage] = useState(1);

  const { data } = useUserList({
    page: page.toString(),
    size: "10",
    search: value,
  });

  console.log(data);

  return (
    <>
      <NavbarLayout title="User List">
        <SearchInput value={value} setValue={setValue} />
      </NavbarLayout>
      <Box>
        <DataTable
          height={"85vh"}
          columns={[
            {
              accessor: "username",
            },
            {
              accessor: "email",
            },
            {
              accessor: "created_at",
              title: "Created User",
              render: ({ created_at }) => {
                return (
                  <Box py={10}>{dayjs(created_at).format("D MMM YYYY")}</Box>
                );
              },
            },
          ]}
          records={data?.data || []}
          withTableBorder
          withColumnBorders
          // highlightOnHover
          totalRecords={data?.pagination.totalPage || 0}
          page={data?.pagination.page || 1}
          recordsPerPage={10}
          onPageChange={(p) => setPage(p)}
        />
      </Box>
    </>
  );
};

export default UserList;
