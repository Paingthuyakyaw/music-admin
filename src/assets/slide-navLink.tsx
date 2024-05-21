import {
  IconAlbum,
  IconHeadphones,
  IconMoodSing,
  IconUsers,
} from "@tabler/icons-react";

export const navLink = [
  {
    link: "/music",
    icon: <IconHeadphones size={20} />,
    title: "Music",
  },
  {
    link: "/artist",
    icon: <IconMoodSing size={20} />,
    title: "Artist",
  },
  {
    link: "/album",
    icon: <IconAlbum size={20} />,
    title: "Album",
  },
  {
    link: "/user-list",
    icon: <IconUsers size={20} />,
    title: "User List",
  },
];
