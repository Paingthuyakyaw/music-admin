import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "../../../api/axios";
import transformFormData, { authJsonHeader } from "../../../util/util";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

interface AlbumProp {
  album: string;
  album_image: File | null;
  artist_id: null;
}

const createAlbum = async (payload: AlbumProp) => {
  const data = axios.post("album", transformFormData(payload), {
    headers: authJsonHeader(),
  });
  return data;
};

const editAlbum = async (id: number, payload: AlbumProp) => {
  const data = await axios.post(
    `album/${id}`,
    transformFormData(payload, true),
    {
      headers: authJsonHeader(),
    }
  );
  return data;
};

export const useCreateAlbum = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (payload: AlbumProp) => createAlbum(payload),
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["album"] });
      notifications.show({
        message: "Album create Successfully",
        icon: <IconCheck />,
        color: "green",
      });
    },
    onError: (data) => {
      console.log({ err: data });

      notifications.show({
        title: "Album create fail",
        message: "Please try again!",
        icon: <IconX />,
        color: "red",
      });
    },
  });
};

export const useEditAlbum = (id: number) => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (payload: AlbumProp) => editAlbum(id, payload),
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["album"] });
      notifications.show({
        message: "Album edit Successfully",
        icon: <IconCheck />,
        color: "green",
      });
    },
    onError: (data) => {
      console.log({ err: data });

      notifications.show({
        title: "Album edit fail",
        message: "Please try again!",
        icon: <IconX />,
        color: "red",
      });
    },
  });
};
