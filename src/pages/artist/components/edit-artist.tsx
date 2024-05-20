import {
  ActionIcon,
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
import { IconEdit, IconImageInPicture } from "@tabler/icons-react";
import { useEditArtist } from "../../../store/server/artist/mutation";

const EditArtist = ({ id }: { id: number }) => {
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

  const edit = useEditArtist(id);

  return (
    <>
      <Drawer position="right" opened={opened} onClose={close}>
        <Title order={3}>Artist Edit</Title>
        {/* create form */}
        <Box mt={10}>
          <form
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
                Edit Artist
              </Button>
            </Flex>
          </form>
        </Box>
      </Drawer>

      <ActionIcon
        // loading={}
        onClick={open}
        bg={"var(--mantine-color-blue-6)"}
      >
        <IconEdit size={20} />
      </ActionIcon>
    </>
  );
};

export default EditArtist;
