import { Await, Link, useLoaderData } from "react-router-dom";
import styles from "./UserAlbums.module.css";
import { Suspense } from "react";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import FetchError from "../FetchError/FetchError";
import { getAlbum, getAlbumPhotos, getUser } from "../../utils/Requests";
export const loader = async ({ params: { id } }) => {
  const album = await getAlbum(id);
  const user = await getUser(album.userId);
  const photoPromise = getAlbumPhotos(id);
  return { album, user, photoPromise };
};

export default function UserAlbums() {
  const { album, user, photoPromise } = useLoaderData();
  return (
    <Container className={styles.mainBox}>
      {" "}
      <Suspense
        fallback={
          <Box sx={{ display: "flex" }}>
            <CircularProgress
              color="error"
              size={100}
              className={styles.spinner}
            />
          </Box>
        }
      >
        <Await resolve={photoPromise} errorElement={<FetchError />}>
          {(photos) => {
            return (
              <Box>
                <Box className={styles.albumInfo}>
                  <Typography variant="h3" className={styles.albumTitle}>
                    {album.title}
                  </Typography>
                  <Typography variant="h5" className={styles.userFullName}>
                    Created by:
                    <Link
                      to={`/users/${user.id}`}
                      className={styles.linkToUser}
                    >
                      {user.name}
                    </Link>
                  </Typography>
                </Box>
                <Box className={styles.albumsContainer}>
                  {photos.map((p) => (
                    <div key={p.id} className={styles.imageBox}>
                      <img className={styles.imageBox} src={p.url} />
                    </div>
                  ))}
                </Box>
              </Box>
            );
          }}
        </Await>
      </Suspense>
    </Container>
  );
}
