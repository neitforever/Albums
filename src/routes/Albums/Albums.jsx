import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import ImageIcon from "@mui/icons-material/Image";
import { Suspense } from "react";
import styles from "./Albums.module.css";

export const loader = async () => {
  const albums = await fetch(
    "https://jsonplaceholder.typicode.com/albums"
  ).then((r) => r.json());
  return { albums };
};

export default function Albums() {
  const { albums } = useLoaderData();
  return (
    <Suspense
      fallback={
        <Box>
          <Typography variant="h4">Loading...</Typography>
          <CircularProgress size={100} />
        </Box>
      }
    >
      <Box classname={styles.container}>
        {albums.map((albums) => (
          <Typography variant="h4">
            <ImageIcon
              style={{ position: "relative", top: "5px" }}
              fontSize="small"
            />
            <Link
              key={albums.id}
              to={`/albums/${albums.id}`}
              className={styles.albumLink}
            >
              {albums.title}
            </Link>
          </Typography>
        ))}
      </Box>
    </Suspense>
  );
}
