import {
  ActionIcon,
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
import { IconEdit, IconImageInPicture, IconMusic } from "@tabler/icons-react";
import { useUpdateMusic } from "../../../store/server/music/mutation";

interface dataProp {
  id: number;
  name: string;
  song_mp3: string;
  description: string;
  song_image: string;
  artist: string;
  album: string;
  release_date: string;
  artist_id: number;
  album_id: number;
}

const EditMusic = ({ data }: { data: dataProp }) => {
  const [opened, { open, close }] = useDisclosure(false);

  // form validation
  const form = useForm({
    initialValues: {
      name: data.name,
      song_mp3: data.song_mp3,
      description: data.description,
      song_image: data.song_image,
      artist_id: data.artist_id,
      album_id: data.album_id,
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

  const edit = useUpdateMusic(data.id);

  return (
    <>
      <Drawer position="right" opened={opened} onClose={close}>
        <Title order={3}>Music Edit</Title>
        {/* create form */}
        <Box mt={10}>
          <form
            encType="application/x-www-form-urlencoded"
            onSubmit={form.onSubmit((value) =>
              edit.mutate(value, {
                onSuccess: () => {
                  form.reset();
                  close();
                },
              })
            )}
            action=""
          >
            <Flex direction={"column"} gap={20}>
              <TextInput {...form.getInputProps("name")} label="Song Name" />

              {/* select bos */}
              <Flex gap={10}>
                <Select
                  value={
                    selectArtist?.find(
                      (art) => art.value === data.artist_id.toString()
                    )?.label
                  }
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

              <Button bg={"var(--mantine-color-music-7)"} type="submit">
                Edit Music
              </Button>
            </Flex>
          </form>
        </Box>
      </Drawer>

      <ActionIcon onClick={open} radius={"md"} variant="light">
        <IconEdit size={20} />
      </ActionIcon>
    </>
  );
};

export default EditMusic;
