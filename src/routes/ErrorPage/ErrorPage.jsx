import React from "react";
import { NavLink } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import styles from "./ErrorPage.module.css";
export default function ErrorPage() {
  return (
    <Box className={styles.container}>
      <Typography variant="h3">404</Typography>
      <Typography variant="h2" className={styles.textUnknownPage}>
        Page not found
      </Typography>
      <Typography variant="h4" className={styles.textGoTo}>
        Go to page:
        <NavLink to="/albums/" end={true} className={styles.link}>
          Albums
        </NavLink>
      </Typography>
    </Box>
  );
}
