import { ActionIcon, Box, Flex } from "@mantine/core";
import NavbarLayout from "../../components/NavbarLayout";
import SearchInput from "../../components/search-input";
import { useDebouncedState, useDisclosure } from "@mantine/hooks";
import { useArtist } from "../../store/server/artist/queries";
import { DataTable } from "mantine-datatable";
import CreateArtist from "./components/create-artist";
import { IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import ConfirmData from "../../components/confirm-button";
import { useDeleteArtist } from "../../store/server/artist/mutation";
import EditArtist from "./components/udate-artist";

const Artist = () => {
  const [value, setValue] = useDebouncedState("", 500);

  const { data } = useArtist({
    page: "1",
    size: "10",
    search: value,
  });

  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [opened, { open, close }] = useDisclosure();

  const deleteArtist = useDeleteArtist();

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
              render: (data) => {
                return (
                  <Box>
                    <Flex justify={"center"} gap={10}>
                      <ActionIcon
                        fz={12}
                        onClick={() => {
                          setDeleteId(data.id);
                          open();
                        }}
                        variant="light"
                        color="var(--mantine-color-music-8)"
                      >
                        <IconTrash size={20} />
                      </ActionIcon>
                      <EditArtist id={data.id} />
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

      {deleteId && (
        <ConfirmData
          opened={opened}
          onConfirm={() => {
            deleteArtist.mutate(deleteId, {
              onSuccess: () => close(),
            });
          }}
          close={close}
          button={{
            title: "Are you sure?",
            message: "If you delete , all artist's album may be lost?",
            btn: "Delete",
          }}
          loading={deleteArtist.isPending}
        />
      )}
    </>
  );
};

export default Artist;
