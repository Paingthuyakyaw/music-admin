import {
  Box,
  Button,
  Drawer,
  FileInput,
  Flex,
  Select,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useArtist } from "../../../store/server/artist/queries";
import { useAlbum } from "../../../store/server/album/queries";
import { IconImageInPicture, IconMusic } from "@tabler/icons-react";
import { useCreateMusic } from "../../../store/server/music/mutation";

const CreateMusic = () => {
  const [opened, { open, close }] = useDisclosure(false);

  // form validation
  const form = useForm({
    initialValues: {
      name: "",
      song_mp3: null,
      description: "",
      song_image: null,
      artist_id: null,
      album_id: null,
    },
    validate: {
      name: isNotEmpty("Song name required"),
      song_mp3: (value) => (value === null ? "Mp3 is required" : null),
      description: isNotEmpty("Description is required"),
      song_image: (value) => (value === null ? "Image is required" : null),
      artist_id: (value) => (value === null ? "Artist is required" : null),
      album_id: (value) => (value === null ? "Album is required" : null),
    },
  });

  // create music
  const createMusic = useCreateMusic();

  // artis
  const { data: artist } = useArtist({ page: "1", size: "999", search: "" });

  const selectArtist = artist
    ? artist.data.map((art) => ({
        value: art.id.toString(),
        label: art.artist,
      }))
    : null;

  // album
  const { data: album } = useAlbum({ page: "1", size: "999", search: "" });

  const selectAlbum = album
    ? album.data.map((alb) => ({
        label: alb.album,
        value: alb.id.toString(),
      }))
    : null;

  return (
    <>
      <Drawer position="right" opened={opened} onClose={close}>
        <Title order={3}>Music Create</Title>
        {/* create form */}
        <Box mt={10}>
          <form
            onSubmit={form.onSubmit((value) =>
              createMusic.mutate(
                {
                  name: value.name,
                  artist_id: Number(value.artist_id),
                  album_id: Number(value.album_id),
                  description: value.description,
                  song_image: value.song_image,
                  song_mp3: value.song_mp3,
                },
                {
                  onSuccess: () => {
                    form.reset();
                    close();
                  },
                }
              )
            )}
            action=""
          >
            <Flex direction={"column"} gap={20}>
              <TextInput {...form.getInputProps("name")} label="Song Name" />

              {/* select bos */}
              <Flex gap={10}>
                <Select
                  data={selectArtist || []}
                  label="Select Artist"
                  placeholder="Select your artist"
                  {...form.getInputProps("artist_id")}
                />
                <Select
                  data={selectAlbum || []}
                  label="Select Album"
                  placeholder="Select your artist"
                  {...form.getInputProps("album_id")}
                />
              </Flex>

              {/* description */}
              <Textarea
                label="Description"
                {...form.getInputProps("description")}
                variant="filled"
              />

              <FileInput
                label="Select Song Mp3"
                placeholder="Select your song"
                rightSection={<IconMusic size={20} />}
                {...form.getInputProps("song_mp3")}
              />

              {/* Image */}

              <FileInput
                label="Select Image"
                placeholder="Select your Image"
                rightSection={<IconImageInPicture />}
                {...form.getInputProps("song_image")}
              />

              <Button
                loading={createMusic.isPending}
                bg={"var(--mantine-color-music-7)"}
                type="submit"
              >
                Create Music
              </Button>
            </Flex>
          </form>
        </Box>
      </Drawer>

      <Button onClick={open} w={130} bg={"var(--mantine-color-music-7)"}>
        Create Music
      </Button>
    </>
  );
};

export default CreateMusic;
