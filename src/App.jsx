import React from "react";
import Users, { loader as usersLoader } from "./routes/Users/Users";
import User, { loader as userLoader } from "./routes/User/User";
import Albums, { loader as albumsLoader } from "./routes/Albums/Albums";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./routes/Layout/Layout";
import AlbumPhotos, {
  loader as albumPhotosLoader,
} from "./routes/AlbumPhotos/AlbumPhotos";
import ErrorPage from "./routes/ErrorPage/ErrorPage";
import styles from "./App.module.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/albums/",
        loader: albumsLoader,
        element: <Albums />,
      },
      {
        path: "/albums/:albumId",
        loader: albumPhotosLoader,
        element: <AlbumPhotos />,
      },
      {
        path: "/users/",
        loader: usersLoader,
        element: <Users />,
      },
      {
        path: "/users/:id",
        loader: userLoader,
        element: <User />,
      },
    ],
  },
]);
export default function App() {
  return <RouterProvider router={router} className={styles.container} />;
}
