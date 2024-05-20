import { Box, Flex } from "@mantine/core";
import NavbarLayout from "../../components/NavbarLayout";
import SearchInput from "../../components/search-input";
import { useDebouncedState } from "@mantine/hooks";
import { useArtist } from "../../store/server/artist/queries";
import { DataTable } from "mantine-datatable";
import CreateArtist from "./components/create-artist";
import EditArtist from "./components/edit-artist";

const Artist = () => {
  const [value, setValue] = useDebouncedState("", 500);

  const { data } = useArtist({
    page: "1",
    size: "10",
    search: value,
  });

  return (
    <>
      <NavbarLayout title="Artist List">
        <SearchInput value={value} setValue={setValue} />
        <CreateArtist />
      </NavbarLayout>
      <Box mr={20} pt={20}>
        <DataTable
          height={"85vh"}
          columns={[
            {
              accessor: "artist",
            },
            {
              accessor: "about",
            },
            {
              accessor: "birth",
            },
            {
              accessor: "album",
              render: ({ album }) => {
                return <Box py={10}>{album.length || 0}</Box>;
              },
            },
            {
              accessor: "id",
              title: "",
              render: ({ id }) => {
                return (
                  <Box>
                    <Flex justify={"center"} gap={10}>
                      <EditArtist id={id} />
                    </Flex>
                  </Box>
                );
              },
            },
          ]}
          records={data?.data || []}
          withTableBorder
          withColumnBorders
          highlightOnHover
          totalRecords={data?.pagination.totalPage || 0}
          page={data?.pagination.page || 1}
          recordsPerPage={10}
          onPageChange={() => {}}
          borderRadius={"md"}
        />
      </Box>
    </>
  );
};

export default Artist;
