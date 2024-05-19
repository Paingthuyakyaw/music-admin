import {
  Box,
  Button,
  Drawer,
  FileInput,
  Flex,
  Select,
  TextInput,
  Title,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconImageInPicture } from "@tabler/icons-react";
import { useArtist } from "../../../store/server/artist/queries";
import { useCreateAlbum } from "../../../store/server/album/mutation";

const CreateAlbum = () => {
  const [opened, { open, close }] = useDisclosure(false);

  // form validation
  const form = useForm({
    initialValues: {
      album: "",
      album_image: null,
      artist_id: null,
    },
    validate: {
      album: isNotEmpty("Album name required"),
      album_image: (value) => (value === null ? "Image is required" : null),
      artist_id: (value) => (value === null ? "Artist is required" : null),
    },
  });

  const createAlbum = useCreateAlbum();

  // artis
  const { data: artist } = useArtist({ page: "1", size: "999", search: "" });

  const selectArtist = artist
    ? artist.data.map((art) => ({
        value: art.id.toString(),
        label: art.artist,
      }))
    : null;

  return (
    <>
      <Drawer position="right" opened={opened} onClose={close}>
        <Title order={3}>Create Album</Title>
        {/* create form */}
        <Box mt={10}>
          <form
            onSubmit={form.onSubmit((value) =>
              createAlbum.mutate(value, {
                onSuccess: () => {
                  close();
                  form.reset();
                },
              })
            )}
            action=""
          >
            <Flex direction={"column"} gap={20}>
              <TextInput {...form.getInputProps("album")} label="Album Name" />

              <Select
                data={selectArtist || []}
                label="Select Artist"
                placeholder="Select your artist"
                {...form.getInputProps("artist_id")}
              />

              {/* Image */}
              <FileInput
                label="Select Image"
                placeholder="Select your Image"
                rightSection={<IconImageInPicture />}
                {...form.getInputProps("album_image")}
              />

              <Button bg={"var(--mantine-color-music-7)"} type="submit">
                Create Artist
              </Button>
            </Flex>
          </form>
        </Box>
      </Drawer>

      <Button
        // loading={}
        onClick={open}
        w={130}
        bg={"var(--mantine-color-music-7)"}
      >
        Create Album
      </Button>
    </>
  );
};

export default CreateAlbum;
