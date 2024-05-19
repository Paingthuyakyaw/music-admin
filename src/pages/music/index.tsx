import { ActionIcon, Box, Flex, Text } from "@mantine/core";
import NavbarLayout from "../../components/NavbarLayout";
import SearchInput from "../../components/search-input";
import { useDebouncedState, useDisclosure } from "@mantine/hooks";
import { useMusic } from "../../store/server/music/queries";
import { DataTable } from "mantine-datatable";
import CreateMusic from "./components/create-music";
import { useDeleteMusic } from "../../store/server/music/mutation";
import ConfirmData from "../../components/confirm-button";
import { useState } from "react";
import EditMusic from "./components/edit-music";
import { IconTrash } from "@tabler/icons-react";
const Music = () => {
  const [value, setValue] = useDebouncedState("", 500);

  const [page, setPage] = useState(1);

  const { data, isPending, isError } = useMusic({
    page: page.toString(),
    size: "10",
    search: value,
  });

  const [opened, { open, close }] = useDisclosure(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const deleteMusic = useDeleteMusic();

  return (
    <>
      <NavbarLayout title="Music List">
        <SearchInput value={value} setValue={setValue} />
        <CreateMusic />
      </NavbarLayout>
      <Box pt={20} mr={20}>
        <DataTable
          fetching={isPending || isError}
          borderRadius={10}
          height={"85vh"}
          columns={[
            {
              accessor: "name",
              render: ({ name, song_image }) => {
                return (
                  <Flex align={"center"} gap={10}>
                    <img
                      src={song_image}
                      style={{
                        width: "45px",
                        height: "45px",
                        borderRadius: "50%",
                      }}
                      alt={name}
                    />
                    <Text>{name}</Text>
                  </Flex>
                );
              },
            },
            {
              accessor: "artist",
            },
            {
              accessor: "album",
            },
            {
              accessor: "release_date",
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

                      <EditMusic data={data} />
                    </Flex>
                  </Box>
                );
              },
            },
          ]}
          records={data?.data}
          withTableBorder
          withColumnBorders
          // highlightOnHover
          totalRecords={data?.pagination.totalPage || 0}
          page={data?.pagination.page || 1}
          recordsPerPage={10}
          onPageChange={(p) => setPage(p)}
        />

        {deleteId && (
          <ConfirmData
            opened={opened}
            onConfirm={() =>
              deleteMusic.mutate(deleteId, {
                onSuccess: () => close(),
              })
            }
            close={close}
            button={{
              title: "Are you sure?",
              message: "Are you sure you deleted the music?",
              btn: "Delete",
            }}
            loading={deleteMusic.isPending}
          />
        )}
      </Box>
    </>
  );
};

export default Music;
