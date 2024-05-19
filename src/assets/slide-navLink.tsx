import { IconAlbum, IconHeadphones, IconLayoutDashboard, IconMoodSing, IconUsers } from "@tabler/icons-react";

export const navLink = [
    {
        link : "/",
        icon : <IconLayoutDashboard size={20} />,
        title : 'Dashboard'
    },
    {
        link : "/music",
        icon :  <IconHeadphones size={20} />,
        title : 'Music',
    },
    {
        link : "/artist",
        icon : <IconMoodSing size={20} />,
        title : "Artist"
    },
    {
        link : '/album',
        icon : <IconAlbum size={20} />,
        title : "Album"
    },
    {
        link : "/user-list",
        icon : <IconUsers size={20} />,
        title : "User List"
    } ,
]