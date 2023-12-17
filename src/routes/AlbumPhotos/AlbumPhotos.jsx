import { CircularProgress, ImageList, ImageListItem } from "@mui/material";
import { Box, Typography } from "@mui/material";
import React, { Suspense } from "react";
import { Await, Link, useLoaderData } from "react-router-dom";
import styles from "./AlbumPhotos.module.css";

export const loader = async ({ params: { albumId } }) => {
  const album = await fetch(
    `https://jsonplaceholder.typicode.com/albums/${albumId}`
  ).then((r) => {
    if (!r.ok) {
      throw new Error(`Album request failed with status ${r.status}`);
    }
    return r.json();
  });
  const user = await fetch(
    `https://jsonplaceholder.typicode.com/users/${album.userId}`
  ).then((r) => r.json());
  const photos = fetch(
    `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`
  ).then((r) => r.json());

  return { album, user, photos };
};

const AlbumPhotos = () => {
  const { album, user, photos } = useLoaderData();

  return (
    <Suspense
      fallback={
        <Box className={styles.loading}>
          <Typography variant="h4">Loading...</Typography>
          <CircularProgress size={100} />
        </Box>
      }
    >
      <Await resolve={photos}>
        {(photosData) => {
          return (
            <Box className={styles.container}>
              <Box className={styles.userInformation}>
                <Typography
                  variant="h4"
                  sx={{ fontSize: 30 }}
                  className={styles.albumTitle}
                >
                  {album.title}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ fontSize: 22 }}
                  className={styles.userName}
                >
                  Created by:
                  <Link
                    to={`/users/${user.id}`}
                    className={styles.userNameLink}
                  >
                    {user.name}
                  </Link>
                </Typography>
              </Box>
              <ImageList
                sx={{
                  m: 0,
                  display: "flex",
                  flexWrap: "wrap",
                }}
                gap={20}
                className={styles.imageList}
              >
                {photosData.map((photos) => (
                  <ImageListItem key={photos.id} className={styles.image}>
                    <img src={photos.url} alt={photos.title} />
                  </ImageListItem>
                ))}
              </ImageList>
            </Box>
          );
        }}
      </Await>
    </Suspense>
  );
};

export default AlbumPhotos;
