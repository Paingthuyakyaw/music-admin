import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "../../../api/axios";
import transformFormData, { authJsonHeader } from "../../../util/util";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

interface musicProp {
  artist: string;
  artist_image: File | null | string;
  about: string;
  birth: string;
}

const artistCreate = async (payload: musicProp) => {
  const { data } = await axios.post(`artist`, transformFormData(payload), {
    headers: authJsonHeader(true),
  });
  return data;
};

export const useArtistCreate = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (payload: musicProp) => artistCreate(payload),
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["artist"] });
      notifications.show({
        message: "Artist create Successfully",
        icon: <IconCheck />,
        color: "green",
      });
    },
    onError: (data) => {
      console.log({ err: data });

      notifications.show({
        title: "Artist create fail",
        message: "Please try again!",
        icon: <IconX />,
        color: "red",
      });
    },
  });
};

const deleteArtist = async (id: number) => {
  const { data } = await axios.delete(`artist/${id}`, {
    headers: authJsonHeader(),
  });
  return data;
};

export const useDeleteArtist = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteArtist(id),
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["artist"] });
      notifications.show({
        message: "Artist delete Successfully",
        icon: <IconCheck />,
        color: "green",
      });
    },
    onError: (data) => {
      console.log({ err: data });

      notifications.show({
        title: "Artist delete fail",
        message: "Please try again!",
        icon: <IconX />,
        color: "red",
      });
    },
  });
};

const editArtist = async (id: number, payload: musicProp) => {
  const data = await axios.post(
    `artist/${id}`,
    transformFormData(payload, true),
    {
      headers: authJsonHeader(),
    }
  );
  return data;
};

export const useEditArtist = (id: number) => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (payload: musicProp) => editArtist(id, payload),
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["artist"] });
      notifications.show({
        message: "Artist edit Successfully",
        icon: <IconCheck />,
        color: "green",
      });
    },
    onError: (data) => {
      console.log({ err: data });

      notifications.show({
        title: "Artist edit fail",
        message: "Please try again!",
        icon: <IconX />,
        color: "red",
      });
    },
  });
};
