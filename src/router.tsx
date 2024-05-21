import { RouterProvider, createBrowserRouter } from "react-router-dom";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      lazy: async () => ({
        Component: (await import("./components/AppLayout")).default,
      }),
      children: [
        {
          index: true,
          lazy: async () => ({
            Component: (await import("./pages/music")).default,
          }),
        },
        {
          path: "music",
          lazy: async () => ({
            Component: (await import("./pages/music")).default,
          }),
        },
        {
          path: "artist",
          lazy: async () => ({
            Component: (await import("./pages/artist")).default,
          }),
        },
        {
          path: "album",
          lazy: async () => ({
            Component: (await import("./pages/album")).default,
          }),
        },
        {
          path: "user-list",
          lazy: async () => ({
            Component: (await import("./pages/user-list")).default,
          }),
        },
      ],
    },
    {
      path: "/login",
      lazy: async () => ({
        Component: (await import("./pages/auth/login")).default,
      }),
    },
    {
      path: "/register",
      lazy: async () => ({
        Component: (await import("./pages/auth/register")).default,
      }),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
