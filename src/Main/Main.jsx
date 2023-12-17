import Layout from "../routes/Layout/Layout";
import Albums, { loader as albumsLoader } from "../routes/Albums/Albums";
import User, { loader as userLoader } from "../routes/User/User";
import Users, { loader as usersLoader } from "../routes/Users/Users";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserAlbums, {
  loader as userAlbumLoader,
} from "../routes/UserAlbums/UserAlbums";
import ErrorPage from "../routes/ErrorPage/ErrorPage";
import FetchError from "../routes/FetchError/FetchError";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        loader: usersLoader,
        element: <Users />,
      },
      {
        path: "/albums",
        loader: albumsLoader,
        element: <Albums />,
      },

      {
        path: "/users/:id",
        loader: userLoader,
        element: <User />,
        errorElement: <FetchError notExist={"user"} />,
      },
      {
        path: "/albums/:id",
        loader: userAlbumLoader,
        element: <UserAlbums />,
        errorElement: <FetchError notExist={"album"} />,
      },
    ],
  },
]);
export default function Main() {
  return <RouterProvider router={router} />;
}
