import React, { Suspense } from "react";
import { Await, Link, useLoaderData } from "react-router-dom";
import { Typography, Box, CircularProgress } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import styles from "./User.module.css";

export const loader = ({ params: { id } }) => {
  const userPromise = fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`
  ).then((r) => r.json());
  const albumsPromise = fetch(
    `https://jsonplaceholder.typicode.com/albums/ `
  ).then((r) => r.json());
  return { userPromise, albumsPromise };
};
export default function User() {
  const { userPromise, albumsPromise } = useLoaderData();

  return (
    <Suspense
      fallback={
        <Box>
          <Typography variant="h4">Loading...</Typography>
          <CircularProgress size={100} />
        </Box>
      }
    >
      <Await resolve={userPromise} errorElement={<div>Ooops</div>}>
        {(user) => {
          return (
            <Await resolve={albumsPromise} errorElement={<div>Ooops</div>}>
              {(albums) => {
                const userAlbums = albums.filter(
                  (album) => album.userId === user.id
                );

                return (
                  <Box className={styles.container}>
                    <Box className={styles.userContainer}>
                      <Typography variant="h5" className={styles.userName}>
                        {user.name}
                      </Typography>
                      <Typography className={styles.userNickName}>
                        Username: {user.username}
                      </Typography>
                      <Typography className={styles.userEmail}>
                        email:{" "}
                        <Link
                          to={user.email}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.userEmailLink}
                        >
                          {user.email}
                        </Link>
                      </Typography>
                      <Typography className={styles.userPhone}>
                        phone: {user.phone}
                      </Typography>
                      <Typography className={styles.userSite}>
                        site:{" "}
                        <Link
                          href={user.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.userSiteLink}
                        >
                          {user.website}
                        </Link>
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="h5" className={styles.albums}>
                        Albums
                      </Typography>
                      <Box className={styles.albumsList}>
                        {userAlbums.map((album) => (
                          <Box>
                            <ImageIcon
                              style={{ position: "relative", top: "5px" }}
                              fontSize="small"
                              className={styles.albumIcon}
                            />
                            <Link
                              key={album.id}
                              to={`/albums/${album.id}`}
                              className={styles.albumLink}
                            >
                              {album.title}
                            </Link>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                );
              }}
            </Await>
          );
        }}
      </Await>
    </Suspense>
  );
}
