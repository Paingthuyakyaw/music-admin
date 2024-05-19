import {
  Box,
  Button,
  Drawer,
  FileInput,
  Flex,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconImageInPicture } from "@tabler/icons-react";
import { useArtistCreate } from "../../../store/server/artist/mutation";

const CreateArtist = () => {
  const [opened, { open, close }] = useDisclosure(false);

  // form validation
  const form = useForm({
    initialValues: {
      artist: "",
      artist_image: null,
      birth: "",
      about: "",
    },
    validate: {
      artist: isNotEmpty("Artist name required"),
      birth: isNotEmpty("Birth is required"),
      about: isNotEmpty("About is required"),
      artist_image: (value) => (value === null ? "Image is required" : null),
    },
  });

  const createArtist = useArtistCreate();

  return (
    <>
      <Drawer position="right" opened={opened} onClose={close}>
        <Title order={3}>Artist Create</Title>
        {/* create form */}
        <Box mt={10}>
          <form
            onSubmit={form.onSubmit((value) =>
              createArtist.mutate(value, {
                onSuccess: () => {
                  form.reset();
                  close();
                },
              })
            )}
            action=""
          >
            <Flex direction={"column"} gap={20}>
              <TextInput
                {...form.getInputProps("artist")}
                label="Artist Name"
              />

              <TextInput
                {...form.getInputProps("birth")}
                label="Artist Birth"
              />

              {/* description */}
              <Textarea
                label="About"
                {...form.getInputProps("about")}
                variant="filled"
              />

              {/* Image */}
              <FileInput
                label="Select Image"
                placeholder="Select your Image"
                rightSection={<IconImageInPicture />}
                {...form.getInputProps("artist_image")}
              />

              <Button bg={"var(--mantine-color-music-7)"} type="submit">
                Create Artist
              </Button>
            </Flex>
          </form>
        </Box>
      </Drawer>

      <Button
        loading={createArtist.isPending}
        onClick={open}
        w={130}
        bg={"var(--mantine-color-music-7)"}
      >
        Create Artist
      </Button>
    </>
  );
};

export default CreateArtist;
